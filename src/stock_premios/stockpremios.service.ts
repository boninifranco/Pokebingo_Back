import { Injectable } from '@nestjs/common';
import { CreateStockPremiosDto } from './dto/create-stockpremios.dto';
import { UpdateStockPremiosDto } from './dto/update-stockpremios.dto';
import { StockPremios } from './entities/stockpremios.entity';

const baseUrl = 'http://localhost:3030/stockpremios/'

@Injectable()
export class StockPremiosService {
  create(createStockPremiosDto: CreateStockPremiosDto) {
    return 'This action adds a new Stock Premios';
  }

  async findAll():Promise<StockPremios[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  findOne(id: number) {
    return `This action returns a #${id} Stock Premios`;
  }

  update(id: number, updateStockPremiosDto: UpdateStockPremiosDto) {
    return `This action updates a #${id} Stock Premios`;
  }

  remove(id: number) {
    return `This action removes a #${id} Stock Premios`;
  }
}
