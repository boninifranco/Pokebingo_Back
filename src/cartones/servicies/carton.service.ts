import { Injectable } from '@nestjs/common';
import { CartonEntity } from '../entities/carton.entity';
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3030/cartones';
@Injectable()
export class CartonService {
  private cartons: CartonEntity[] = []; 

  async findAll(): Promise<CartonEntity[]> {
    const response = await fetch (BASE_URL);
    const data = await response.json();
    this.cartons = data;
    return this.cartons;
    
  }

  async findById(id: number): Promise<CartonEntity> { 
    const response = await fetch (`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  }

  async create(cartonData: Partial<CartonEntity>): Promise<CartonEntity> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartonData),
    });
    const newCarton = await response.json();
    this.cartons.push(newCarton); // Añade el nuevo cartón al array local
    return newCarton;
  }
  async update(id: number, cartonData: Partial<CartonEntity>): Promise<CartonEntity> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartonData),
    });
    const updatedCarton = await response.json();
    //const index = this.cartons.findIndex(carton => carton.id === id);
    //if (index !== -1) {
    //  this.cartons[index] = updatedCarton; // Actualiza el cartón en el array local
    //}
    return updatedCarton;
  }
  async delete(id: number): Promise<void> {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    this.cartons = this.cartons.filter(carton => carton.id !== id); // Elimina el cartón del array local
  }
}
