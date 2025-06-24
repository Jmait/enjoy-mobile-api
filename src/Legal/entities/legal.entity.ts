import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('legal')

export class LegalEntity {
    @PrimaryGeneratedColumn('uuid')
    postId:string
    

    @Column({nullable:true, default:'Title goes here....'})
    title: string

    @Column({nullable:true, default:'Policy Page'})
     pageTitle: string

    @Column('text', {default:'Lorem ipsum data and ......'})
    content:string

    @Column('text', {default:'fr'})
    language:string
}