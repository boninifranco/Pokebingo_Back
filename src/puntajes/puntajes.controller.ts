import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { CreatePuntajesDto } from './dto/create-puntajes.dto';
import { UpdatePuntajesDto } from './dto/update-puntajes.dto';
import { Response } from 'express';
import { Puntajes } from './entities/puntajes.entity';

@Controller('puntajes')
export class PuntajesController {
  constructor(private readonly puntajesService: PuntajesService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  create(@Body() createPuntajesDto: CreatePuntajesDto) {
    return this.puntajesService.create(createPuntajesDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.puntajesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response):Promise<Puntajes> {
    const isPuntaje = await this.puntajesService.findOne(id);
    if(isPuntaje){
      res.status(HttpStatus.FOUND).json(isPuntaje)
      return isPuntaje;
    }
    res.status(HttpStatus.NOT_FOUND).json({message:`El puntaje con id ${id} no existe`})
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePuntajesDto: UpdatePuntajesDto, @Res() res: Response ):Promise<Puntajes> {
    const isPuntaje = await this.puntajesService.update(+id, updatePuntajesDto);
    if(isPuntaje){
      res.status(HttpStatus.FOUND).json(isPuntaje)
      return isPuntaje;
    }
    res.status(HttpStatus.NOT_FOUND).json({message:`El puntaje con id ${id} no existe`})
  }

  

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res:Response) {
    const isPuntaje = await this.puntajesService.remove(id);
    if(isPuntaje){
      res.status(HttpStatus.FOUND).json(isPuntaje)     
    }
    res.status(HttpStatus.NOT_FOUND).json({message:`El puntaje con id ${id} no existe`})
    
  }
}
