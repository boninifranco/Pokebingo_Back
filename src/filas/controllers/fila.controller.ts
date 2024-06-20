import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { FilaService } from '../service/fila.service';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { UpdateFilaDto } from '../dto/update-fila.dto'; 
import { Response } from 'express';
import { Fila } from '../entities/fila.entity';

@Controller('filas')
export class FilaController {
  constructor(private readonly filaService: FilaService) {}

  @Get()
  async getAllFilas(@Res() res: Response): Promise<Fila[]> {
    const filas = await this.filaService.getAllFilas();
    res.status(HttpStatus.OK).json(filas);
    return filas;
  }

  @Get(':id')
  async getFilaById(@Param('id') id: string, @Res() res: Response):Promise<Fila> {
    try {
      const fila = await this.filaService.getFilaById(id);
      res.status(HttpStatus.OK).json(fila);
      return fila;
    } catch (error) {
      throw new NotFoundException('La fila no fue encontrada');
    }
  }

  @Post()
  async createFila(@Body() createFilaDto: CreateFilaDto, @Res() res: Response):Promise<Fila> {
    try {
      const newFila = await this.filaService.createFila(createFilaDto);
      res.status(HttpStatus.CREATED).json(newFila);
      return newFila;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al crear la fila' });
    }
  }

  @Put(':id')
  async updateFila(@Param('id') id: string, @Body() updateFilaDto: UpdateFilaDto, @Res() res: Response):Promise<Fila> {
    try {
      const updatedFila = await this.filaService.updateFila(id, updateFilaDto);
      res.status(HttpStatus.OK).json(updatedFila);
      return updatedFila;
    } catch (error) {
      throw new NotFoundException('La fila no fue encontrada');
    }
  }

  @Delete(':id')
  async deleteFila(@Param('id') id: string) {
    return this.filaService.deleteFila(id);
  }
}
