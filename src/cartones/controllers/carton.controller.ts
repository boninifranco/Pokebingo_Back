import { Controller, Get, Post, Put, Delete, Body, Param, Res, HttpStatus, NotFoundException, ParseIntPipe, Patch } from '@nestjs/common';
import { CartonService } from '../servicies/carton.service';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { Response } from 'express';
import { CartonEntity } from '../entities/carton.entity';

@Controller('cartones')
export class CartonController {
  constructor(private readonly cartonService: CartonService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const cartons = await this.cartonService.findAll();
    return res.status(HttpStatus.OK).json(cartons);
  }

  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response):Promise<CartonEntity> {
    const carton = await this.cartonService.findById(id);
   
      if(carton){
        res.status(HttpStatus.FOUND).json(carton);
        return;
      }
      res.status(HttpStatus.NOT_FOUND).json({message: `El carton con id ${id} no se encontró`})
    
  }

  @Post()
  async create(@Body() createCartonDto: CreateCartonDto, @Res() res: Response) {
    const createdCarton = await this.cartonService.create(createCartonDto);
    return res.status(HttpStatus.CREATED).json(createdCarton);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCartonDto: UpdateCartonDto, @Res() res: Response):Promise<CartonEntity> {
    const updatedCarton = await this.cartonService.update(id, updateCartonDto);
    if(updatedCarton){
      res.status(HttpStatus.FOUND).json(updatedCarton);
      return updatedCarton;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El carton con id ${id} no se encontró en el patch`})
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response):Promise<CartonEntity> {
    const deleteCarton = await this.cartonService.delete(id);
    if(deleteCarton){
      res.status(HttpStatus.FOUND).json({...deleteCarton, borrado:true});
      return;
    }
    res.status(HttpStatus.NOT_FOUND).json({message: `El logueo con id ${id} no se encontró`})
  }
}