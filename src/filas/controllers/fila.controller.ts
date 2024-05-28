import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { FilaService } from '../service/fila.service';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { UpdateFilaDto } from '../dto/update-fila.dto'; 
import { Response } from 'express';

@Controller('filas')
export class FilaController {
  constructor(private readonly filaService: FilaService) {}

  @Get()
  async getAllFilas(@Res() res: Response) {
    const filas = await this.filaService.getAllFilas();
    return res.status(HttpStatus.OK).json(filas);
  }

  @Get(':id')
  async getFilaById(@Param('id') id: string, @Res() res: Response) {
    try {
      const fila = await this.filaService.getFilaById(id);
      return res.status(HttpStatus.OK).json(fila);
    } catch (error) {
      throw new NotFoundException('La fila no fue encontrada');
    }
  }

  @Post()
  async createFila(@Body() createFilaDto: CreateFilaDto, @Res() res: Response) {
    try {
      const newFila = await this.filaService.createFila(createFilaDto);
      return res.status(HttpStatus.CREATED).json(newFila);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al crear la fila' });
    }
  }

  @Put(':id')
  async updateFila(@Param('id') id: string, @Body() updateFilaDto: UpdateFilaDto, @Res() res: Response) {
    try {
      const updatedFila = await this.filaService.updateFila(id, updateFilaDto);
      return res.status(HttpStatus.OK).json(updatedFila);
    } catch (error) {
      throw new NotFoundException('La fila no fue encontrada');
    }
  }

  @Delete(':id')
  async deleteFila(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.filaService.deleteFila(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new NotFoundException('La fila no fue encontrada');
    }
  }
}
