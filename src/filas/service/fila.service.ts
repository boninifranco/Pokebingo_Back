import { Injectable, NotFoundException } from '@nestjs/common';
import fetch from 'node-fetch';
import { CreateFilaDto } from '../dto/create-fila.dto';

@Injectable()
export class FilaService {
  private readonly BASE_URL = 'http://localhost:3030/filas';

  async getAllFilas(): Promise<any[]> {
    const response = await fetch(this.BASE_URL);
    if (!response.ok) {
      throw new Error('Error al obtener las filas');
    }
    return response.json();
  }

  async getFilaById(id: string): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/${id}`);
    if (!response.ok) {
      throw new NotFoundException(`La fila con el ID ${id} no fue encontrada`);
    }
    return response.json();
  }

  async createFila(createFilaDto: CreateFilaDto): Promise<any> {
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
}
