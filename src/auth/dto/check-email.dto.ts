import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CheckEmailDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email to check' })
  @IsEmail()
  email: string;
}