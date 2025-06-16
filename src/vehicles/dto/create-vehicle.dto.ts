import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { VehicleTypes } from "src/common/enum";

export class CreateVehicleDto {
    @ApiProperty()
    @IsEnum(VehicleTypes)
    vehicleType:string

    @ApiProperty()
    @IsNumber()
    price:number
}