import { Controller, Get, Post, Put, Delete, Param, Body, Res } from '@nestjs/common';
import { ImagenService } from '../service/imagen.service';
import { Response } from 'express';
import { CreateImagenDto } from '../dto/create-imagen.dto'
import { UpdateImagenDto } from '../dto/update-imagen.dto'

@Controller('imagenes')
export class ImagenController {
  constructor(private readonly imagenService: ImagenService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    try {
      const imagenes = await this.imagenService.findAll();
      res.status(200).json(imagenes);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      const imagen = await this.imagenService.findOne(id);
      if (!imagen) {
        res.status(404).json({ error: 'Imagen no encontrada' });
      } else {
        res.status(200).json(imagen);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  @Post()
  async create(@Body() createImagenDto: CreateImagenDto, @Res() res: Response): Promise<void> {
    try {
      const newImagen = await this.imagenService.create(createImagenDto);
      res.status(201).json(newImagen);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateImagenDto: UpdateImagenDto, @Res() res: Response): Promise<void> {
    try {
      const updatedImagen = await this.imagenService.update(id, updateImagenDto);
      res.status(200).json(updatedImagen);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    try {
      await this.imagenService.remove(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}
