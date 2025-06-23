import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


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

export class LegalQuery{
    @IsString()
    @IsOptional()
    pageTitle:string
}