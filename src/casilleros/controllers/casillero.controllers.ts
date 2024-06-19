import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { CasilleroService } from '../service/casillero.service';
import { CreateCasilleroDto } from '../dto/create-casillero.dto';
import { UpdateCasilleroDto } from '../dto/update-casillero.dto';
import { Response } from 'express';
import { Casillero } from '../entities/casillero.entity';

@Controller('casilleros')
export class CasilleroController {
  constructor(private readonly casilleroService: CasilleroService) {}

  @Get()
  async getAllCasilleros(@Res() res: Response):Promise <Casillero[]> {
    const casilleros = await this.casilleroService.findAll();
    res.status(HttpStatus.OK).json(casilleros);
    return casilleros;
  }

  @Get(':id')
  async getCasilleroById(@Param('id') id: string, @Res() res: Response):Promise<Casillero> {
    try {
      const casillero = await this.casilleroService.findOne(id);
      res.status(HttpStatus.OK).json(casillero);
      return casillero;
    } catch (error) {
      throw new NotFoundException('Casillero no encontrado');
    }
  }

  @Post()
  async createCasillero(@Body() createCasilleroDto: CreateCasilleroDto, @Res() res: Response):Promise<Casillero> {
    try {
      const newCasillero = await this.casilleroService.create(createCasilleroDto);
      res.status(HttpStatus.CREATED).json(newCasillero);
      return newCasillero;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al crear el casillero' });
    }
  }

  @Put(':id')
  async updateCasillero(@Param('id') id: string, @Body() updateCasilleroDto: UpdateCasilleroDto, @Res() res: Response):Promise<Casillero> {
    try {
      const updatedCasillero = await this.casilleroService.update(id, updateCasilleroDto);
      res.status(HttpStatus.OK).json(updatedCasillero);
      return updatedCasillero;
    } catch (error) {
      throw new NotFoundException('Error al actualizar el casillero');
    }
  }

  @Delete(':id')
  async deleteCasillero(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.casilleroService.delete(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new NotFoundException('Error al eliminar el casillero');
    }
  }
}
