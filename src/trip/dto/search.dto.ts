import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { BookingStatus, PaymentStatus } from "src/common/enum";

export class SearchBookingDto {
@ApiProperty()
@IsNumber(
)
limit:number=10;
@ApiProperty()
@IsNumber()
page:number=1


 
}
