import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class HandleCancellationDto {
  @IsEnum(['APPROVE', 'REJECT'])
  action: 'APPROVE' | 'REJECT';

  @IsOptional()
  @IsNumber()
  refundAmount?: number;
}


export class CancelBookingRequestDto {
  @IsString()
  reason: string;
}
