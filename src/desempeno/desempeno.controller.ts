import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, Res} from '@nestjs/common';
import { DesempenioService } from './desempeno.service';
import { CreateDesempenioDto } from './dto/create-desempeno.dto';
import { UpdateDesempenioDto } from './dto/update-desempeno.dto';
import { Response } from 'express';
import { Desempenio } from './entities/desempeno.entity';

@Controller('desempeno')
export class DesempenioController {
  constructor(private readonly desempenioService: DesempenioService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  create(@Body() createDesempenioDto: CreateDesempenioDto) {
    return this.desempenioService.create(createDesempenioDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.desempenioService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number):Promise<Desempenio> {
    const isDesempenio = await this.desempenioService.findOne(id);
    if(isDesempenio){
      res.status(HttpStatus.FOUND).json(isDesempenio)
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El desempeno con id ${id} no se encontro`})
    return isDesempenio
  }

  @Patch(':id')
  async update(@Res() res: Response, @Param('id',ParseIntPipe) id: number, @Body() updateDesempenioDto: UpdateDesempenioDto): Promise<Desempenio> {
    const isDesempenio = await this.desempenioService.update(id, updateDesempenioDto);
    if (isDesempenio){
      res.status(HttpStatus.FOUND).json(isDesempenio)
      return isDesempenio;
    }
    res.status(HttpStatus.NOT_FOUND).json({message:`El desempeno con id ${id} no se encontró`}) ;
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const isDesempenio = await this.desempenioService.remove(id);
    if(isDesempenio){
      res.status(HttpStatus.FOUND).json(isDesempenio);
    }
    res.status(HttpStatus.NOT_FOUND).json({message:`El desempeno con id ${id} no se encontro`}) 
  }
}
