import { Repository } from "typeorm";

import { InjectRepository } from "@nestjs/typeorm";
import { UpdateContentDto } from "./dto/content-dto";
import { LegalEntity } from "./entities/legal.entity";


export class LegalService {
    constructor(
        @InjectRepository(LegalEntity)
        private readonly legalRepo:Repository<LegalEntity>
    ){}

   
 async createLegalContent(dto: UpdateContentDto,){
      const legal = this.legalRepo.create({
         content:dto.content,
         title:dto.title
      }, )

      return await this.legalRepo.save(legal)
    }

    async updateLegalContent(dto: UpdateContentDto, postId:string){
      return await this.legalRepo.update({
        postId,
      }, {
        content: dto.content,
        title: dto.title
      })
    }

    async getContent(){
     return await this.legalRepo.find();
    }
}