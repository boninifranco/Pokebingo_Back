import { Injectable } from '@nestjs/common';
import { CartonEntity } from '../entities/carton.entity';
import fetch from 'node-fetch';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { setId } from 'src/funciones/funciones';

const BASE_URL = 'http://localhost:3030/cartones';
@Injectable()
export class CartonService {   

  async findAll(): Promise<CartonEntity[]> {
    const response = await fetch (BASE_URL);
    const data = await response.json();    
    return data;    
  }

  async findById(id: number): Promise<CartonEntity> { 
    const response = await fetch (`${BASE_URL}/${id}`);
    if(!response.ok)return;
    const data = await response.json();
    return data;
  }

  async create(createCartonDto: CreateCartonDto): Promise<CartonEntity> {
    const datos = await this.findAll();
    const id = datos[0]?setId(datos[datos.length-1].id).toString() : setId(0);
    const newCarton = {...createCartonDto,id}
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCarton),      
    });
    const parsed = await response.json();
    
    return parsed;
  }
  async update(id: number, updateCartonDto: UpdateCartonDto ): Promise<CartonEntity> {
    const isCarton = await this.findById(id);
    if(!isCarton)return;
    const newCarton = {...updateCartonDto, id}
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCarton),
    });
    const updatedCarton = await response.json();    
    return updatedCarton;
  }
  async delete(id: number):Promise<CartonEntity>{
    const isCarton = await this.findById(id);
    if(!isCarton)return;    
    const res = await fetch(`${BASE_URL}/${id}`, {      
      method: 'DELETE',
    });
    const parsed = await res.json();    
    return parsed;
    
  }
}
