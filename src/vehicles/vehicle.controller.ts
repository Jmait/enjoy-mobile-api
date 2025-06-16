import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";


@ApiTags('Vehicle management')
@Controller('vehicles')
export class VehicleController {
    constructor(private readonly vehicleService:VehicleService){}
     @UseGuards(JwtAuthGuard)
      @ApiBearerAuth()
    @Post()
    createVehicle(@Body()dto:CreateVehicleDto){
    return this.vehicleService.createVehicle(dto)
    }
    
     @UseGuards(JwtAuthGuard)
      @ApiBearerAuth()
    @Get()
    getVehicles(){
     return this.vehicleService.getVehicles();
    }
     @UseGuards(JwtAuthGuard)
      @ApiBearerAuth() 
    @Patch(':vehicleId/edit')

     manageVehicles(@Body()dto:UpdateVehicleDto, @Param('vehicleId')vehicleId:string){
      return this.vehicleService.manageVehicles(dto, vehicleId)
    }
}