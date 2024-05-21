import { Injectable } from '@nestjs/common';
import { CreateMetodosPagoDto } from './dto/create-metodos_pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos_pago.dto';
import { MetodosPago } from './entities/metodospago.entity';
import { setId } from 'src/funciones/funciones';

const baseUrl = 'http://localhost:3030/metodospago'

@Injectable()
export class MetodosPagoService {
  async create(createMetodosPagoDto: CreateMetodosPagoDto): Promise<MetodosPago> {
    const datos = await this.findAll();
    const id = datos.length ? setId(datos[datos.length - 1].id) : setId(0);
    const newMetodoPago = { ...createMetodosPagoDto, id };
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMetodoPago),
    });
    const parsed = await res.json();
    return parsed;
  }

  async findAll(): Promise<MetodosPago[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  async findOne(id: number): Promise<MetodosPago> {
    const res = await fetch(`${baseUrl}/${id}`);
    const parsed = await res.json();
    return parsed;
  }

  async update(id: number, updateMetodosPagoDto: UpdateMetodosPagoDto): Promise<MetodosPago> {
    const res = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateMetodosPagoDto),
    });
    const parsed = await res.json();
    return parsed;
  }

  async remove(id: number): Promise<void> {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }
}
