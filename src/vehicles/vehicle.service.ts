import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleEntity } from "./entity/vehicle.entity";
import { Repository } from "typeorm";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(VehicleEntity)
        private vehicleRepository: Repository<VehicleEntity>
    ){}
     async  createVehicle(body:CreateVehicleDto){
        try {
            const newVehicle =  this.vehicleRepository.create({
                 vehicleType: body.vehicleType,
                 price: body.price
            })
          return await this.vehicleRepository.save(newVehicle);
        } catch (error) {
         throw new InternalServerErrorException(error.message); 
        }
    }

   async getVehicles(){
      return await this.vehicleRepository.find();
    }

   async manageVehicles(dto: UpdateVehicleDto, vehicleId:string){
        try {
          return   await this.vehicleRepository.update(
             {vehicleId},
            {
                ...dto
             });
            
        } catch (error) {
         throw new InternalServerErrorException(error.message);
        }
    }
}