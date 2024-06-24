import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException, ParseIntPipe, Patch } from '@nestjs/common';
import { CartonService } from '../servicies/carton.service';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { Response } from 'express';
import { Carton } from '../entities/carton.entity';

@Controller('cartones')
export class CartonController {
  constructor(private readonly cartonService: CartonService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const cartons = await this.cartonService.findAll();
    return res.status(HttpStatus.OK).json(cartons);
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response):Promise<Carton> {
    const carton = await this.cartonService.findById(id);
   
      if(carton){
        res.status(HttpStatus.FOUND).json(carton);
        return carton;
      }
      res.status(HttpStatus.NOT_FOUND).json({message: `El carton con id ${id} no se encontró`})
    
  }

  @Post()
  async create(@Body() createCartonDto: CreateCartonDto, @Res() res: Response) {
    const createdCarton = await this.cartonService.create(createCartonDto);
    return res.status(HttpStatus.CREATED).json(createdCarton);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCartonDto: UpdateCartonDto, @Res() res: Response):Promise<Carton> {
    const updatedCarton = await this.cartonService.update(id, updateCartonDto);
    if(updatedCarton){
      res.status(HttpStatus.FOUND).json(updatedCarton);
      return updatedCarton;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El carton con id ${id} no se encontró en el patch`})
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number){
    return this.cartonService.delete(id);
  }
}