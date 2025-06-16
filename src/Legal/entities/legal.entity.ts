import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('legal')

export class LegalEntity {
    @PrimaryGeneratedColumn('uuid')
    postId:string

    @Column('text', {default:'Lorem ipsum data and ......'})
    content:string
}