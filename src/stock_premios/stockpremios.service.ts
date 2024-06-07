import { Injectable } from '@nestjs/common';
import { CreateStockPremiosDto } from './dto/create-stockpremios.dto';
import { UpdateStockPremiosDto } from './dto/update-stockpremios.dto';
import { StockPremios } from './entities/stockpremios.entity';
import { setId } from 'src/funciones/funciones';

const baseUrl = 'http://localhost:3030/stockPremios'

@Injectable()
export class StockPremiosService {
  async create(createStockPremiosDto: CreateStockPremiosDto): Promise<StockPremios> {
    const datos = await this.findAll();
    const id = datos.length ? setId(datos[datos.length - 1].id).toString() : setId(0);
    const newStockPremio = { ...createStockPremiosDto, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStockPremio),
    });
    const parsed = await res.json();
    return parsed;
  }

  async findAll(): Promise<StockPremios[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number): Promise<StockPremios> {
    const res = await fetch(`${baseUrl}/${id}`);
    if(!res.ok)return;
    const parsed = await res.json();
    return parsed;
  }

  async update(id: number, updateStockPremiosDto: UpdateStockPremiosDto): Promise<StockPremios> {
    const stockPremio = await this.findOne(id);
    if(!stockPremio)return;
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateStockPremiosDto),
    });
    const parsed = await res.json();
    return parsed;
  }

  async remove(id: number): Promise<StockPremios> {
    const stockPremio = await this.findOne(id);
    if(!stockPremio)return;
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed; 
  }
}
