import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookingDto } from "./dto/bookings.dto";
import { Booking } from "./entities/booking.entity";
import Stripe from 'stripe';
import { PaymentMethod, PaymentStatus } from "src/common/enum";
import { config } from 'dotenv';
import { User } from "src/auth/entities/user.entity";
import { SearchBookingDto } from "./dto/search.dto";


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
     private userRepository: Repository<User>
  ) {}



async create(createBookingDto: CreateBookingDto): Promise<{ booking: Booking; clientSecret?: string }> {
  try {
    const {
      totalPrice,
      languageFee,
      welcomeSignFee,
      paymentMethod,
      customerId,
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

  async cancelBooking(){

  }

//   async update(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
//     const booking = await this.findOne(id);

//     // If vehicle is being updated, validate it
//     if (updateBookingDto.vehicleId && updateBookingDto.vehicleId !== booking.vehicleId) {
//       const vehicle = await this.vehicleRepository.findOne({
//         where: { id: updateBookingDto.vehicleId },
//       });
//       if (!vehicle) {
//         throw new NotFoundException('Vehicle not found');
//       }
//       if (!vehicle.isAvailable) {
//         throw new BadRequestException('Vehicle is not available');
//       }
//     }

//     // If locations are being updated, validate them
//     if (updateBookingDto.departureLocationId && updateBookingDto.departureLocationId !== booking.departureLocationId) {
//       const location = await this.locationRepository.findOne({
//         where: { id: updateBookingDto.departureLocationId },
//       });
//       if (!location) {
//         throw new NotFoundException('Departure location not found');
//       }
//     }

//     if (updateBookingDto.destinationLocationId && updateBookingDto.destinationLocationId !== booking.destinationLocationId) {
//       const location = await this.locationRepository.findOne({
//         where: { id: updateBookingDto.destinationLocationId },
//       });
//       if (!location) {
//         throw new NotFoundException('Destination location not found');
//       }
//     }

//     // Recalculate price if necessary details are updated
//     const priceRecalculationNeeded = 
//       updateBookingDto.departureLocationId ||
//       updateBookingDto.destinationLocationId ||
//       updateBookingDto.vehicleId ||
//       updateBookingDto.passengers ||
//       updateBookingDto.bags ||
//       updateBookingDto.driverLanguage !== undefined ||
//       updateBookingDto.welcomeSign !== undefined;

//     let updatedBooking = { ...booking, ...updateBookingDto };

//     if (priceRecalculationNeeded) {
//       const priceCalculation = await this.calculatePrice({
//         departureLocationId: updatedBooking.departureLocationId,
//         destinationLocationId: updatedBooking.destinationLocationId,
//         vehicleId: updatedBooking.vehicleId,
//         passengers: updatedBooking.passengers,
//         bags: updatedBooking.bags,
//         driverLanguage: updatedBooking.driverLanguage,
//         welcomeSign: updatedBooking.welcomeSign,
//       });

//       updatedBooking = {
//         ...updatedBooking,
//         totalPrice: priceCalculation.totalPrice,
//         languageFee: priceCalculation.languageFee,
//         welcomeSignFee: priceCalculation.welcomeSignFee,
//       };
//     }

//     if (updateBookingDto.tripDateTime) {
//       updatedBooking.tripDateTime = new Date(updateBookingDto.tripDateTime);
//     }

//     await this.bookingRepository.update(id, updatedBooking);
//     return this.findOne(id);
//   }




async findAll(searchDto: SearchBookingDto) {
    const { page = 1, limit = 10, ...filters } = searchDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.bookingRepository
      .createQueryBuilder('booking')
      .skip(skip)
      .take(limit)
      .orderBy('booking.createdAt', 'DESC');

    // Apply filters
    if (filters.customerName) {
      queryBuilder.andWhere('booking.customerName ILIKE :customerName', {
        customerName: `%${filters.customerName}%`,
      });
    }

    if (filters.customerEmail) {
      queryBuilder.andWhere('booking.customerEmail ILIKE :customerEmail', {
        customerEmail: `%${filters.customerEmail}%`,
      });
    }

    if (filters.status) {
      queryBuilder.andWhere('booking.status = :status', { status: filters.status });
    }

    if (filters.paymentStatus) {
      queryBuilder.andWhere('booking.paymentStatus = :paymentStatus', {
        paymentStatus: filters.paymentStatus,
      });
    }

    if (filters.dateFrom && filters.dateTo) {
      queryBuilder.andWhere('booking.tripDateTime BETWEEN :dateFrom AND :dateTo', {
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      });
    } else if (filters.dateFrom) {
      queryBuilder.andWhere('booking.tripDateTime >= :dateFrom', {
        dateFrom: filters.dateFrom,
      });
    } else if (filters.dateTo) {
      queryBuilder.andWhere('booking.tripDateTime <= :dateTo', {
        dateTo: filters.dateTo,
      });
    }

    if (filters.departureLocationId) {
      queryBuilder.andWhere('booking.departureLocationId = :departureLocationId', {
        departureLocationId: filters.departureLocationId,
      });
    }

    if (filters.destinationLocationId) {
      queryBuilder.andWhere('booking.destinationLocationId = :destinationLocationId', {
        destinationLocationId: filters.destinationLocationId,
      });
    }

    if (filters.vehicleId) {
      queryBuilder.andWhere('booking.vehicleId = :vehicleId', {
        vehicleId: filters.vehicleId,
      });
    }

    const [bookings, total] = await queryBuilder.getManyAndCount();

    return {
      data: bookings,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async remove(id: string): Promise<void> {
    const booking = await this.findOne(id);
    await this.bookingRepository.remove(booking);
  }

 
}