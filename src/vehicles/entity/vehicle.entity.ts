import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('vechicle')

export class VehicleEntity {
    @PrimaryGeneratedColumn('uuid')
    vehicleId:string
    @Column()
    vehicleType:string
    @Column('float')
    price:number
}