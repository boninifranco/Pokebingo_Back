import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateImagenDto } from '../dto/create-imagen.dto';
import { ImagenService } from '../service/imagen.service';
import { Imagen } from '../entities/imagen.entity';

@Controller('imagenes')
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}

  @Get()
  async findAll(): Promise<Imagen[]> {
    return this.imagenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Imagen> {
    return this.imagenService.findOne(id);
  }

  @Post()
  create(@Body() createImagenDto: CreateImagenDto): Promise<Imagen> {
    return this.imagenService.create(createImagenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.imagenService.remove(id);
  }
}