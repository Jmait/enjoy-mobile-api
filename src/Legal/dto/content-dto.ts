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

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    language:string


}



export enum LegalType {
  TERMS = 'terms-of-sale',
  TERMS_OF_USE='terms-of-use'
  PRIVACY = 'privacy-policy',
}
export enum LegalLanguage {
  fr='fr',
  en='en'
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


    @IsEnum(LegalLanguage)
  @IsOptional()
  langauage: LegalLanguage
}