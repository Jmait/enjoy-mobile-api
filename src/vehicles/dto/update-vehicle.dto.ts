import {  OmitType, PartialType } from "@nestjs/swagger";
import { CreateVehicleDto } from "./create-vehicle.dto";

export class UpdateVehicleDto extends OmitType(CreateVehicleDto,['vehicleType']) {
  // All fields from CreateVehicleDto are now optional
}
