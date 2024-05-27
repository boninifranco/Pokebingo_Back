import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CreateCasilleroDto } from '../dto/create-casillero.dto';

@Injectable()
export class CasilleroService {
  private BASE_URL = 'http://localhost:3030/cartones';

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
};
