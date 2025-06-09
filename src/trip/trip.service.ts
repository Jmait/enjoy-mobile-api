import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookingDto } from "./dto/bookings.dto";
import { Booking } from "./entities/booking.entity";
import Stripe from 'stripe';
import { BookingStatus, CancellationStatus, PaymentMethod, PaymentStatus } from "src/common/enum";
import { config } from 'dotenv';
import { User } from "src/auth/entities/user.entity";
import { SearchBookingDto } from "./dto/search.dto";
import { CancelBookingRequestDto, HandleCancellationDto } from "./dto/cancellation.dto";
import { EmailService } from "src/email/email.service";
import { SendRideDetailsDto } from "./dto/send-ride-details.dto";


config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-04-30.basil',
});
@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(User)
     private userRepository: Repository<User>,
     private readonly emailService:EmailService
  ) {}
  // onModuleInit() {
  //   this.bookingRepository.deleteAll()
  // }



async create(createBookingDto: CreateBookingDto,): Promise<{ booking: Booking; clientSecret?: string }> {
  try {
    const {
      totalPrice,
      languageFee,
      welcomeSignFee,
      departAddress,
      destinationAddress,
      paymentMethod,
      customerId
    } = createBookingDto;
    const user = await this.userRepository.findOne({where:{id:customerId}});
    if (!user) {
     throw new NotFoundException('User not found');
    }
    const booking = this.bookingRepository.create({
      ...createBookingDto,
      tripDateTime: new Date(createBookingDto.tripDateTime),
      totalPrice,
      languageFee,
      welcomeSignFee,
      paymentStatus: paymentMethod === PaymentMethod.CARD ? PaymentStatus.PENDING : PaymentStatus.COMPLETED,
    });

    const savedBooking = await this.bookingRepository.save(booking);

    let clientSecret: string | undefined;

    if (paymentMethod === PaymentMethod.CARD) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(totalPrice) * 100), // Stripe expects amount in the smallest currency unit
        currency: 'eur', // or 'usd', or your currency
        receipt_email: user.email,
        metadata: {
          bookingId: savedBooking.bookingId,
        },
      });

      clientSecret = paymentIntent.client_secret;
    }

    return { booking: savedBooking, clientSecret };
  } catch (error) {
    console.error(error);
    throw new InternalServerErrorException('Booking creation failed');
  }

}

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { bookingId: id },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  async completePayment(bookingId:string){
    try {
        const booking = await this.bookingRepository.findOne({where:{ bookingId}});
        if (!booking) {
            throw new NotFoundException('No booking found with provided id')
        }
      return await this.bookingRepository.update({bookingId}, {paymentStatus:PaymentStatus.COMPLETED});
    } catch (error) {
       throw new InternalServerErrorException('An error occured');  
    }
  }

 async handleCancellation(bookingId: string, dto: HandleCancellationDto) {
  const booking = await this.bookingRepository.findOne({
    where: { bookingId },
    relations:['customer']
  });

  if (!booking || booking.cancellationStatus !== CancellationStatus.REQUESTED) {
    throw new BadRequestException('No cancellation request pending');
  }

  if (dto.action === 'REJECT') {
    booking.cancellationStatus = CancellationStatus.REJECTED;
    await this.bookingRepository.save(booking);

    // Send rejection email to user
    await this.emailService.sendEmail({
      to: booking.customer.email,
      subject: 'Booking Cancellation Rejected',
      text: `Your cancellation request for booking ID ${booking.bookingId} has been rejected.`,
    });

    return { message: 'Cancellation rejected' };
  }

  // Approve logic
  booking.cancellationStatus = CancellationStatus.APPROVED;

  const tripDateTime = new Date(booking.tripDateTime);
  const now = new Date();
  const hoursBeforeTrip = (tripDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  let refundAmount = 0;
  if (hoursBeforeTrip >= 48) {
    refundAmount = booking.totalPrice;
  } else if (dto.refundAmount != null) {
    refundAmount = dto.refundAmount;
  }

  booking.refundedAmount = refundAmount;

  if (booking.paymentStatus === PaymentStatus.COMPLETED && refundAmount > 0) {
    // const paymentIntentId = await this.getPaymentIntentIdForBooking(booking.bookingId);
    // await stripe.refunds.create({
    //   payment_intent: paymentIntentId,
    //   amount: Math.round(refundAmount * 100),
    // });
  }

  await this.bookingRepository.save(booking);

  // Send approval email to user
  await this.emailService.sendEmail({
    to: booking.customer.email,
    subject: 'Booking Cancellation Approved',
    text: `Your cancellation for booking ID ${booking.bookingId} has been approved.\nRefund Amount: €${refundAmount}`,
  });

  return {
    message: 'Cancellation approved',
    refundAmount,
  };
}

async usertripHistory(searchDto: SearchBookingDto, customerId:string) {
  console.log(customerId)
    try {
          const { page = 1, limit = 10, } = searchDto;
  const [data, total] = await this.bookingRepository.findAndCount({
    where:{customerId},
    order: { createdAt: 'DESC' },
    take: limit,
    skip: (page - 1) * limit,
  });
  return {
    data,
    total,
    page,
    limit,
  };
    } catch (error) {
     throw new InternalServerErrorException(error.message)  
    }
   
  }




async findAll(searchDto: SearchBookingDto) {
    const { page = 1, limit = 10, } = searchDto;
  const [data, total] = await this.bookingRepository.findAndCount({
    order: { createdAt: 'DESC' },
    take: limit,
    relations:['customer'],
    skip: (page - 1) * limit,
  });
  return {
    data,
    total,
    page,
    limit,
  };



  


  }

  async remove(id: string): Promise<void> {
    const booking = await this.findOne(id);
    await this.bookingRepository.remove(booking);
  }

async requestCancellation(bookingId: string, userId: string, dto: CancelBookingRequestDto) {
  const booking = await this.bookingRepository.findOne({ where: { bookingId } });

  if (!booking) {
    throw new NotFoundException('Booking not found or not owned by user');
  }

  if (booking.cancellationStatus !== CancellationStatus.NONE) {
    throw new BadRequestException('Cancellation already requested or processed');
  }

const now = new Date();
const tripDateTime = new Date(booking.tripDateTime);
const diffInMs = tripDateTime.getTime() - now.getTime(); 
const diffInHours = diffInMs / (1000 * 60 * 60);

const requiresAdminApproval= diffInHours > 48;
  await this.bookingRepository.update(
    { bookingId },
    {
      cancellationStatus: requiresAdminApproval ? CancellationStatus.APPROVED : CancellationStatus.REQUESTED,
      status:requiresAdminApproval? BookingStatus.PENDING: BookingStatus.CANCELLED,
      cancellationReason: dto.reason,
      refundedAmount:requiresAdminApproval? Number(booking.totalPrice):0,
      cancellationRequestedAt: now,
    },
  );

  return {
    message: requiresAdminApproval
      ? 'Cancellation request submitted for manual review (partial or no refund)'
      : 'Cancellation approved',
  };
}


async sendRideDetails(dto:SendRideDetailsDto){
  try {
    await this.emailService.sendEmail({
      subject:dto.subject??`Ride Confirmation and details`,
      to:dto.email,
      text:dto.message
    })
  } catch (error) {
    throw new InternalServerErrorException('An error occured')
  }
}

}