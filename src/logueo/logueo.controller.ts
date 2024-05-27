import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, ParseIntPipe } from '@nestjs/common';
import { LogueoService } from './logueo.service';
import { CreateLogueoDto } from './dto/create-logueo.dto';
import { UpdateLogueoDto } from './dto/update-logueo.dto';
import { Response } from 'express';
import { Logueo } from './entities/logueo.entity';

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
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number):Promise<Logueo|null> {
    const logueo = await this.logueoService.findOne(+id);
    if(logueo){
      res.status(HttpStatus.FOUND).json(logueo);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El logueo con id ${id} no se encontró`})
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id', ParseIntPipe) id: number, @Body() updateLogueoDto: UpdateLogueoDto):Promise<Logueo|null> {
    const logueo = await this.logueoService.update(+id, updateLogueoDto);
      if(logueo){
      res.status(HttpStatus.FOUND).json(logueo);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El logueo con id ${id} no se encontró`})
  }
  

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<any> {
    const logueo = await this.logueoService.remove(id);
    if(logueo){
      res.status(HttpStatus.FOUND).json({...logueo, borrado:true});
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El logueo con id ${id} no se encontró`})
  } 
}

