import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { TorneosService } from './torneos.service';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Torneo } from './entities/torneo.entity';
import { Response } from 'express';

@Controller('torneos')
export class TorneosController {
  constructor(private readonly torneosService: TorneosService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  async create(@Body() createTorneoDto: CreateTorneoDto): Promise <Torneo> {
    return this.torneosService.create(createTorneoDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async findAll():Promise<Torneo[]> {
    return this.torneosService.findAll();
  }
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: number): Promise<Torneo | null> {
    const torneo = await this.torneosService.findOne(id)
    if (torneo) {
      res.status(HttpStatus.FOUND).json(torneo);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'torneo no existe' });
  }
  @Put(':id')
  async update(@Res() res: Response, @Param('id') id: number, @Body() UpdateTorneoDto: UpdateTorneoDto): Promise<Torneo | null> {
    const torneo = await this.torneosService.update(id, UpdateTorneoDto);
    if (torneo) {
      res.status(HttpStatus.FOUND).json(torneo);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'torneo no existe' });
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const torneo = await this.torneosService.remove(id);
    if(torneo){
      res.status(HttpStatus.FOUND).json(torneo);      
    }
    res.status(HttpStatus.NOT_FOUND).json({error:`chat no existe`})
  }
}
