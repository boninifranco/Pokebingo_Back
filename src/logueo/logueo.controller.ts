import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, ParseIntPipe, UseGuards } from '@nestjs/common';
import { LogueoService } from './logueo.service';
import { CreateLogueoDto } from './dto/create-logueo.dto';
import { UpdateLogueoDto } from './dto/update-logueo.dto';
import { Response } from 'express';
import { Logueo } from './entities/logueo.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';

@Controller('logueo')
export class LogueoController {
  constructor(private readonly logueoService: LogueoService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  create(@Body() createLogueoDto: CreateLogueoDto) {
    return this.logueoService.create(createLogueoDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.logueoService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number):Promise<Logueo> {
    const logueo = await this.logueoService.findOne(+id);
    
    if(logueo){
    //if (Object.keys(logueo).length){
      res.status(HttpStatus.FOUND).json(logueo);
      return logueo;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El logueo con id ${id} no se encontró`})
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body() updateLogueoDto: UpdateLogueoDto):Promise<Logueo> {
    const logueo = await this.logueoService.update(+id, updateLogueoDto);
      if(logueo){
      res.status(HttpStatus.FOUND).json(logueo);
      return logueo;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El logueo con id ${id} no se encontró en el patch`})
  }
  /*@Patch('/deslogueo/:id')
  async deslogueo(@Res() res: Response, @Param('id', ParseIntPipe) id: number):Promise<Logueo> {
    const logueo = await this.logueoService.deslogueo(+id);
      if(logueo){
      res.status(HttpStatus.FOUND).json(logueo);
      return logueo;
      }
    res.status(HttpStatus.NOT_FOUND).json({message: `El logueo con id ${id} no se encontró en el patch`})
  }*/
  
  //@UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<Logueo> {
    const logueo = await this.logueoService.remove(id);
    if(logueo){
      res.status(HttpStatus.FOUND).json(logueo);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El logueo con id ${id} no se encontró`})
  } 
}

