import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, HttpStatus, ParseIntPipe} from '@nestjs/common';
import { TorneosService } from './torneos.service';
import { CreateTorneoDto } from './dto/create-torneo.dto';
import { UpdateTorneoDto } from './dto/update-torneo.dto';
import { Torneo } from './entities/torneo.entity';

@Controller('torneos')
export class TorneosController {
  constructor(private readonly torneosService: TorneosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTorneoDto: CreateTorneoDto): Promise<Torneo> {
    return this.torneosService.create(createTorneoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Torneo[]> {
    return this.torneosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Torneo> {
    const torneo = await this.torneosService.findOne(id);
    return torneo;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateTorneoDto: UpdateTorneoDto,
  ): Promise<Torneo> {
    const torneo = await this.torneosService.update(id, UpdateTorneoDto);
    return torneo;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const torneo = await this.torneosService.remove(id);
    return torneo;
  }
}
