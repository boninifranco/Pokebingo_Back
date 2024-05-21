import { Controller, Get, Param } from '@nestjs/common';
import { CasilleroService } from 'src/casilleros/service/casillero.service';
import { CreateCasilleroDto } from '../dto/create-casillero.dto';

@Controller('casilleros')
export class CasilleroController {
  constructor(private readonly casilleroService: CasilleroService) {}

  @Get()
  async getAllCasilleros() {
    return this.casilleroService.getAllCasilleros();
  }

  @Get(':id')
  async getCasilleroById(@Param('id') id: string) {
    return this.casilleroService.getCasilleroById(id);
  }
};
