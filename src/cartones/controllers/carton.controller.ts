import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, ParseIntPipe, Patch, HttpCode } from '@nestjs/common';
import { CartonService } from '../servicies/carton.service';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { Carton } from '../entities/carton.entity';

@Controller('cartones')
export class CartonController {
  constructor(private readonly cartonService: CartonService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.cartonService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number):Promise<Carton> {
    const carton = await this.cartonService.findOne(id);
    return carton;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCartonDto: CreateCartonDto) {
    return this.cartonService.create(createCartonDto);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCartonDto: UpdateCartonDto):Promise<Carton> {
    const updatedCarton = await this.cartonService.update(id, updateCartonDto);
    return updatedCarton;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number){
    return this.cartonService.delete(id);
  }
}