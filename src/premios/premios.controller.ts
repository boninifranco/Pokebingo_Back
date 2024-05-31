import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { PremiosService } from './premios.service';
import { CreatePremiosDto } from './dto/create-premios.dto';
import { UpdatePremiosDto } from './dto/update-premios.dto';
import { Response } from 'express';
import { Premios } from './entities/premios.entity';

@Controller('premios')
export class PremiosController {
  constructor(private readonly premiosService: PremiosService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  create(@Body() createPremiosDto: CreatePremiosDto) {
    return this.premiosService.create(createPremiosDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll() {
    return this.premiosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res:Response) {
    const isPremio = await this.premiosService.findOne(id)
    if(isPremio){
      res.status(HttpStatus.FOUND).json(isPremio)
      return ;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `Premio con id ${id} no encontrado`})
    
    
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePremiosDto: UpdatePremiosDto, @Res() res: Response) {
    const isPremio = await this.premiosService.update(id, updatePremiosDto);
    if(isPremio){
      res.status(HttpStatus.FOUND).json(isPremio)
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El premio con id ${id} no existe`})
     
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res:Response){
    const isPremio = await this.premiosService.remove(id);
    if(isPremio){
      res.status(HttpStatus.FOUND).json(isPremio)
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message:`El premio con id ${id} no existe`})
     
  }
}
