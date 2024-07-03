import { Controller, Get, Post, Body, Param, Delete, HttpCode, Res, HttpStatus, Put, ParseIntPipe } from '@nestjs/common';
import { SalaService } from './sala.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';
import { Response } from 'express';

@Controller('sala')
export class SalaController {
  constructor(private readonly salaService: SalaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSalaDto: CreateSalaDto): Promise<Sala> {
    return this.salaService.create(createSalaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Sala[]> {
    return this.salaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Sala> {
    const sala = await this.salaService.findOne(id);
    return sala;
  }
  
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() UpdateSalaDto: UpdateSalaDto): Promise<Sala> {
    const sala = await this.salaService.update(id, UpdateSalaDto);
    return sala;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number){
    const sala = await this.salaService.remove(id);
    return sala;
  }
}
