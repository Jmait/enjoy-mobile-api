import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class HandleCancellationDto {
  @ApiProperty()
  @IsEnum(['APPROVE', 'REJECT'])
  action: 'APPROVE' | 'REJECT';
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  refundAmount?: number;
}


export class CancelBookingRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  reason: string;
}
