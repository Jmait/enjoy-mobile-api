import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateContentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
     @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title:string
     @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content:string

      @ApiProperty()
    @IsString()
    @IsNotEmpty()
    pageTitle:string
}



export enum LegalType {
  TERMS = 'terms',
  PRIVACY = 'privacy',
  COOKIE = 'cookies',
  LEGAL ='legal-notice',
}

export class LegalQuery {
  @ApiProperty({
    enum: LegalType,
    required: false,
    description: 'Type of legal document (e.g., TERMS, PRIVACY, COOKIE)',
  })
  @IsEnum(LegalType)
  @IsOptional()
  type: LegalType;
}