import { Injectable } from '@nestjs/common';
import { CreateMetodosPagoDto } from './dto/create-metodos_pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos_pago.dto';
import { MetodosPago } from './entities/metodospago.entity';

const baseUrl = 'http://localhost:3030/MetodosPago/'

@Injectable()
export class MetodosPagoService {
  create(createMetodosPagoDto: CreateMetodosPagoDto) {
    return 'This action adds a new Metodos de Pago';
  }

  async findAll():Promise<MetodosPago> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  findOne(id: number) {
    return `This action returns a #${id} Metodos de Pago`;
  }

  update(id: number, updateMetodosPagoDto: UpdateMetodosPagoDto) {
    return `This action updates a #${id} Metodos de Pago`;
  }

  remove(id: number) {
    return `This action removes a #${id} Metodos de Pago`;
  }
}
