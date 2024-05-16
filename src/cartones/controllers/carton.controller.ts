import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CartonService } from '../servicies/carton.service';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { UpdateCartonDto } from '../dto/update-carton.dto'; 

@Controller('cartones')
export class CartonController {
  constructor(private readonly cartonService: CartonService) {}

  @Get()
  async findAll() {
    return this.cartonService.findAll();
  }

  @Get('id')
  async findById(@Param('id') id: number) {
    return this.cartonService.findById(id);
  }

  @Post()
  async create(@Body() cartonDto: CreateCartonDto) {
    return this.cartonService.create(cartonDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() cartonDto: UpdateCartonDto) {
    return this.cartonService.update(id, cartonDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.cartonService.delete(id);
  }
}
