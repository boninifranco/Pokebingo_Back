import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { CartonService } from '../servicies/carton.service';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { Response } from 'express';

@Controller('cartones')
export class CartonController {
  constructor(private readonly cartonService: CartonService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const cartons = await this.cartonService.findAll();
    return res.status(HttpStatus.OK).json(cartons);
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response) {
    const carton = await this.cartonService.findById(id);
    if (!carton) {
      throw new NotFoundException('Carton not found');
    }
    return res.status(HttpStatus.OK).json(carton);
  }

  @Post()
  async create(@Body() cartonDto: CreateCartonDto, @Res() res: Response) {
    const createdCarton = await this.cartonService.create(cartonDto);
    return res.status(HttpStatus.CREATED).json(createdCarton);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() cartonDto: UpdateCartonDto, @Res() res: Response) {
    const updatedCarton = await this.cartonService.update(id, cartonDto);
    if (!updatedCarton) {
      throw new NotFoundException('Carton not found');
    }
    return res.status(HttpStatus.OK).json(updatedCarton);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    await this.cartonService.delete(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
