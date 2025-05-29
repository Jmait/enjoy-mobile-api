import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { BookingStatus, PaymentStatus } from "src/common/enum";

export class SearchBookingDto {
@IsNumber(
)
limit:number=10;

@IsNumber()
page:number=1
  @ApiPropertyOptional({
    description: 'Customer name search',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  customerName?: string;

  @ApiPropertyOptional({
    description: 'Customer email search',
    example: 'john@example.com',
  })
  @IsOptional()
  @IsString()
  customerEmail?: string;

  @ApiPropertyOptional({
    description: 'Booking status filter',
    enum: BookingStatus,
    example: BookingStatus.CONFIRMED,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiPropertyOptional({
    description: 'Payment status filter',
    enum: PaymentStatus,
    example: PaymentStatus.PAID,
  })
  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @ApiPropertyOptional({
    description: 'Trip date from',
    example: '2024-01-24',
  })
  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @ApiPropertyOptional({
    description: 'Trip date to',
    example: '2024-01-31',
  })
  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @ApiPropertyOptional({
    description: 'Departure location ID',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsOptional()
  @IsString()
  departureLocationId?: string;

  @ApiPropertyOptional({
    description: 'Destination location ID',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsOptional()
  @IsString()
  destinationLocationId?: string;

  @ApiPropertyOptional({
    description: 'Vehicle ID',
    example: '123e4567-e89b-12d3-a456-426614174003',
  })
  @IsOptional()
  @IsString()
  vehicleId?: string;
}
