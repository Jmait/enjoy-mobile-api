// src/users/dto/update-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail, IsPhoneNumber, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
 @ApiProperty()
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lastName?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;
  
  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Min(1900)
  birthYear?: number;
}
