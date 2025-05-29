import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import {  Languages, PaymentMethod, VehicleTypes } from 'src/common/enum';



export class CreateBookingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  departureLocation: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  destinationLocation: string;

  @ApiProperty()
  @IsDateString()
  tripDateTime: Date;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  passengers: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  bags: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  childSeat: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  pets: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  wheelchair: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  boosterSeat?: number;

  @ApiProperty()
  @IsEnum(Languages)
  @IsOptional()
  driverLanguage?: Languages;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  welcomeSign?: boolean=false;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  languageSpecific?: boolean=false;

  @ApiProperty()
  @IsString()
  @IsOptional()
  flightNumber?: string;

  @ApiProperty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  languageFee?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  welcomeSignFee?: number;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiProperty()
  @IsUUID()
  customerId: string;
 

  @ApiProperty()
  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @ApiProperty()
  @IsEnum(VehicleTypes)
  vehicleType: VehicleTypes;
}
