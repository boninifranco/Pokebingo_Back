import { Injectable, NotFoundException } from '@nestjs/common';
import fetch from 'node-fetch';
import { CreateFilaDto } from '../dto/create-fila.dto';
import { Fila } from '../entities/fila.entity';

@Injectable()
export class FilaService {
  private readonly BASE_URL = 'http://localhost:3030/filas';

  async getAllFilas(): Promise<Fila[]> {
    const response = await fetch(this.BASE_URL);
    if (!response.ok) {
      throw new Error('Error al obtener las filas');
    }
    return response.json();
  }

  async getFilaById(id: string): Promise<Fila> {
    const response = await fetch(`${this.BASE_URL}/${id}`);
    if (!response.ok) {
      throw new NotFoundException(`La fila con el ID ${id} no fue encontrada`);
    }
    return response.json();
  }

  async createFila(createFilaDto: CreateFilaDto): Promise<Fila> {
    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createFilaDto),
    });
    if (!response.ok) {
      throw new Error('Error al crear la fila');
    }
    return response.json();
  }

  async updateFila(id: string, updateFilaDto: Partial<CreateFilaDto>): Promise<Fila> {
    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateFilaDto),
    });
    if (!response.ok) {
      throw new Error(`Error al actualizar la fila con ID ${id}`);
    }
    return response.json();
  }

  async deleteFila(id: string): Promise<Fila> {
    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar la fila con ID ${id}`);
    }
    const parsed = response.json();
    return parsed;
  }
}
