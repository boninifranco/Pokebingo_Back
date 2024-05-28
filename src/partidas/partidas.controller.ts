import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpCode, Put } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { CreatePartidaDto } from './dto/create-partida.dto';
import { UpdatePartidaDto } from './dto/update-partida.dto';
import { Partida } from './entities/partida.entity';
import { Response } from 'express';

@Controller('partidas')
export class PartidasController {
  constructor(private readonly partidasService: PartidasService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  async create(@Body() createPartidaDto: CreatePartidaDto): Promise<Partida> {
    return this.partidasService.create(createPartidaDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async findAll(): Promise<Partida[]> {
    return this.partidasService.findAll();
  }
  
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: number): Promise<Partida | null> {
    const partida = await this.partidasService.findOne(id)
    if (partida) {
      res.status(HttpStatus.FOUND).json(partida);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'partida no existe' });
  }
  @Put(':id')
  async update(@Res() res: Response, @Param('id') id: number, @Body() UpdatePartidaDto: UpdatePartidaDto): Promise<Partida | null> {
    const partida = await this.partidasService.update(id, UpdatePartidaDto);
    if (partida) {
      res.status(HttpStatus.FOUND).json(partida);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'partida no existe' });
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const partida = await this.partidasService.remove(id);
    if(partida){
      res.status(HttpStatus.FOUND).json(partida);      
    }
    res.status(HttpStatus.NOT_FOUND).json({error:`chat no existe`})
  }
}
