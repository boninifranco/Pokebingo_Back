import { Controller, Get, Param } from '@nestjs/common';
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
};
