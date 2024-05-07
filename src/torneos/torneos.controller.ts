import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TorneosService } from './torneos.service';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Torneo } from './entities/torneo.entity';

@Controller('torneos')
export class TorneosController {
  constructor(private readonly torneosService: TorneosService) {}

  @Post()
  async create(@Body() createTorneoDto: CreateTorneoDto): Promise <Torneo> {
    return this.torneosService.create(createTorneoDto);
  }

  @Get()
  async findAll():Promise<Torneo[]> {
    return this.torneosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.torneosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTorneoDto: UpdateTorneoDto) {
    return this.torneosService.update(+id, updateTorneoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.torneosService.remove(+id);
  }
}
