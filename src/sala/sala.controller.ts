import { Controller, Get, Post, Body, Param, Delete, HttpCode, Res, HttpStatus, Put } from '@nestjs/common';
import { SalaService } from './sala.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';
import { Response } from 'express';

@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  @HttpCode(HttpStatus.FOUND)
  create(@Body() createSalaDto: CreateSalaDto): Promise<any> {
    return this.salaService.create(createSalaDto);
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  findAll(): Promise<Sala[]> {
    return this.salaService.findAll();
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: number): Promise<Sala | null> {
    const sala = await this.salaService.findOne(id)
    if (sala) {
      res.status(HttpStatus.FOUND).json(sala);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'sala no existe' });
  }
  
  @Put(':id')
  async update(@Res() res: Response, @Param('id') id: number, @Body() UpdateSalaDto: UpdateSalaDto): Promise<Sala | null> {
    const sala = await this.salaService.update(id, UpdateSalaDto);
    if (sala) {
      res.status(HttpStatus.FOUND).json(sala);
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({ error: 'sala no existe' });
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: number): Promise<void> {
    const sala = await this.salaService.remove(id);
    if(sala){
      res.status(HttpStatus.FOUND).json(sala);      
    }
    res.status(HttpStatus.NOT_FOUND).json({error:`chat no existe`})
  }
}
