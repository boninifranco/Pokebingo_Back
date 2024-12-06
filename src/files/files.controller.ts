import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';



@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('premios/:imageName')
  findPremioImage(
    @Res() res: Response,
    @Param('imageName') imageName: string ) {

      const path = this.filesService.getStaticPremioImage(imageName);

      res.sendFile( path)
    }

  @Post('premios')
  @UseInterceptors( FileInterceptor('file',{
    fileFilter: fileFilter,
    //limits:{fileSize:1000},
    storage: diskStorage({
      destination:'./static-assets/premios',
      filename: fileNamer
    })

  }))
  uploadPremiosImages(    
    @UploadedFile() file: Express.Multer.File){

      if(!file){
        throw new BadRequestException('El archivo no es una imagen')
      }

      const secureUrl = `http://localhost:3000/files/premios/${file.filename}`
    return { secureUrl }
  }
}