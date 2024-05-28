import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { CasilleroService } from '../service/casillero.service';
import { CreateCasilleroDto } from '../dto/create-casillero.dto';
import { UpdateCasilleroDto } from '../dto/update-casillero.dto';
import { Response } from 'express';

@Controller('casilleros')
export class CasilleroController {
  constructor(private readonly casilleroService: CasilleroService) {}

  @Get()
  async getAllCasilleros(@Res() res: Response) {
    const casilleros = await this.casilleroService.getAllCasilleros();
    return res.status(HttpStatus.OK).json(casilleros);
  }

  @Get(':id')
  async getCasilleroById(@Param('id') id: string, @Res() res: Response) {
    try {
      const casillero = await this.casilleroService.getCasilleroById(id);
      return res.status(HttpStatus.OK).json(casillero);
    } catch (error) {
      throw new NotFoundException('Casillero no encontrado');
    }
  }

  @Post()
  async createCasillero(@Body() createCasilleroDto: CreateCasilleroDto, @Res() res: Response) {
    try {
      const newCasillero = await this.casilleroService.createCasillero(createCasilleroDto);
      return res.status(HttpStatus.CREATED).json(newCasillero);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al crear el casillero' });
    }
  }

  @Put(':id')
  async updateCasillero(@Param('id') id: string, @Body() updateCasilleroDto: UpdateCasilleroDto, @Res() res: Response) {
    try {
      const updatedCasillero = await this.casilleroService.updateCasillero(id, updateCasilleroDto);
      return res.status(HttpStatus.OK).json(updatedCasillero);
    } catch (error) {
      throw new NotFoundException('Error al actualizar el casillero');
    }
  }

  @Delete(':id')
  async deleteCasillero(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.casilleroService.deleteCasillero(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new NotFoundException('Error al eliminar el casillero');
    }
  }
}
