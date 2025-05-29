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
 
}
