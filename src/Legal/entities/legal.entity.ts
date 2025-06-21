import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('legal')

export class LegalEntity {
    @PrimaryGeneratedColumn('uuid')
    postId:string
    

    @Column({nullable:true, default:'Title goes here....'})
    title: string

    @Column('text', {default:'Lorem ipsum data and ......'})
    content:string
}