import { User } from 'src/auth/entities/user.entity';
import { BookingStatus, Languages, PaymentMethod, PaymentStatus } from 'src/common/enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';



@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  bookingId: string;

  @Column()
  departureLocation: string;

  @Column()
  destinationLocation: string;

    @Column()
  departureLat: number;

  @Column()
  destinationLat: number;

     @Column()
  departureLng: number;

  @Column()
  destinationLng: number;

     @Column()
  distance: number;

  @Column()
  time: number;

  @Column({ type: 'timestamptz' })
  tripDateTime: Date;

  @Column()
  passengers: number;

  @Column()
  bags: number;

  @Column({ default: 0 })
  childSeat: number;

  @Column({ default: 0 })
  pets: number;

  @Column({ default: 0 })
  wheelchair: number;

  @Column({ default: 0 })
  boosterSeat: number;

  @Column({
    type: 'enum',
    enum: Languages,
    default: Languages.FRENCH,
  })
  driverLanguage: Languages;

  @Column({ default: false })
  welcomeSign: boolean;

  @Column({ nullable: true })
  flightNumber?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  languageFee: number;

  @Column({type:Boolean, default:false})
  specificLanguage: boolean;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  welcomeSignFee: number;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status: BookingStatus;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  paymentMethod?: PaymentMethod;

  @Column({})
  @ManyToOne(()=>User)
  customerId:string

  @JoinColumn({name:'customerId'})
  customer: User


  @Column({ nullable: true })
  specialInstructions?: string;

  @Column({}) 
  vehicleType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
