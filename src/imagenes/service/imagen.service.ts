import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CreateImagenDto } from '../dto/create-imagen.dto'; 
import { UpdateImagenDto } from '../dto/update-imagen.dto';
import { Imagen } from '../entities/imagen.entity';

@Injectable()
export class ImagenService {
  private readonly BASE_URL = 'http://localhost:3030/imagenes';

  async findAll(): Promise<Imagen[]> {
    const response = await fetch(this.BASE_URL);
    if (!response.ok) {
      throw new Error('Error al obtener las imágenes');
    }
    return response.json();
  }

  async findOne(id: string): Promise<Imagen> {
    const response = await fetch(`${this.BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener la imagen con el ID ${id}`);
    }
    return response.json();
  }

  async create(createImagenDto: CreateImagenDto): Promise<Imagen> {
    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createImagenDto),
    });
    if (!response.ok) {
      throw new Error('Error al crear la imagen');
    }
    return response.json();
  }

  async update(id: string, updateImagenDto: UpdateImagenDto): Promise<Imagen> {
    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateImagenDto),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar la imagen con el ID ${id}`);
    }
    return response.json();
  }

  async remove(id: string): Promise<Imagen> {
    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar la imagen con el ID ${id}`);
    }
    const parsed = response.json();
    return parsed;
  }
}
