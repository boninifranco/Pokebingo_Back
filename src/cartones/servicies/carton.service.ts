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
    return data;
  }

  async findById(id: number): Promise<CartonEntity> { 
    const response = await fetch (`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  }

  async create(cartonData: Partial<CartonEntity>): Promise<CartonEntity> {
    const carton: CartonEntity = { ...cartonData } as CartonEntity;
    this.cartons.push(carton);
    return carton;
  }
  async update(id: number, cartonData: Partial<CartonEntity>): Promise<CartonEntity> {
    const index = this.cartons.findIndex(carton => carton.id === id);
    if (index !== -1) {
      this.cartons[index] = { ...this.cartons[index], ...cartonData } as CartonEntity;
      return this.cartons[index];
    }
    return null; // Si no se encuentra el cartón con el ID dado
  }
  async delete(id: number): Promise<void> {
    this.cartons = this.cartons.filter(carton => carton.id !== id);
  }
}