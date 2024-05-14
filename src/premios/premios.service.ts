import { Injectable } from '@nestjs/common';
import { CreatePremiosDto } from './dto/create-premios.dto';
import { UpdatePremiosDto } from './dto/update-premios.dto';
import { Premios } from './entities/premios.entity';


const baseUrl = 'http://localhost:3030/premios/'

@Injectable()
export class PremiosService {
  create(createPremiosDto: CreatePremiosDto) {
    return 'This action adds a new premios';
  }

  async findAll():Promise<Premios[]> {
    const res = await fetch(baseUrl);
    const parsed = await res.json();
    return parsed;
  }

  findOne(id: number) {
    return `This action returns a #${id} premios`;
  }

  update(id: number, updatePremiosDto: UpdatePremiosDto) {
    return `This action updates a #${id} premios`;
  }

  remove(id: number) {
    return `This action removes a #${id} premios`;
  }
}
