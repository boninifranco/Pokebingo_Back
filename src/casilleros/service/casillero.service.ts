import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CreateCasilleroDto } from '../dto/create-casillero.dto';
import { UpdateCasilleroDto } from '../dto/update-casillero.dto';

@Injectable()
export class CasilleroService {
  private BASE_URL = 'http://localhost:3030/casilleros'; 

  async getAllCasilleros(): Promise<any[]> {
    const response = await fetch(this.BASE_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los casilleros');
    }
    const casilleros = await response.json();
    return casilleros;
  }

  async getCasilleroById(id: string): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener el casillero con ID ${id}`);
    }
    const casillero = await response.json();
    return casillero;
  }

  async createCasillero(createCasilleroDto: CreateCasilleroDto): Promise<any> {
    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createCasilleroDto),
    });
    if (!response.ok) {
      throw new Error('Error al crear el casillero');
    }
    const newCasillero = await response.json();
    return newCasillero;
  }

  async updateCasillero(id: string, updateCasilleroDto: UpdateCasilleroDto): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCasilleroDto),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el casillero');
    }
    const updatedCasillero = await response.json();
    return updatedCasillero;
  }

  async deleteCasillero(id: string): Promise<void> {
    const response = await fetch(`${this.BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el casillero');
    }
  }
}
