import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UpdateContentDto } from "./dto/content-dto";
import { LegalService } from "./legal.service";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@ApiTags('Legal pages')
@Controller('legal')
export class LegalController {
    constructor(
        private readonly legalService: LegalService
    ){}
     
    @Post()
     async  createContent(@Body()dto:UpdateContentDto){
      return this.legalService.createLegalContent(dto);
     }
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
     @Patch(':postId')
     async updateLegalContent(@Body()dto:UpdateContentDto, @Param('postId')postId:string){
      return this.legalService.updateLegalContent(dto, postId);
    }

    @Get()
    async getContent(){
        return this.legalService.getContent()
    }
}