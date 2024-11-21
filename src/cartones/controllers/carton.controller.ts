import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  ParseIntPipe,
  HttpCode,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { CartonService } from '../servicies/carton.service';
import { CreateCartonDto } from '../dto/create-carton.dto';
import { UpdateCartonDto } from '../dto/update-carton.dto';
import { Carton } from '../entities/carton.entity';
import { AuthGuard } from 'src/auth/auth/auth.guard';
import { Partida } from 'src/partidas/entities/partida.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('cartones')
export class CartonController {
  constructor(
    private readonly cartonService: CartonService,
    @InjectRepository(Partida) private partidaRepository: Repository<Partida>,
  ) {}

  @Get('/partida/:partida')
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('partida') partida: number): Promise<Carton[]> {
    return await this.cartonService.findAll(partida);
  }

  @Get('/max')
  async maxIdCarton(): Promise<number> {
    const ultimoCarton = await this.cartonService.maxIdCarton();
    return ultimoCarton;
  }

  @Get('/all')
  async getAllCartonesConusuario(
    @Query('criterio') criterio: string,
    @Query('orden') orden: 'ASC' | 'DESC' = 'ASC',
    @Query('partida') partida: Partida,
  ) {
    return await this.cartonService.getAllCartones(criterio, orden, partida);
  }

  @Get('/todos/:partida')
  async allCartones(@Param('partida') partida: Partida) {
    return await this.cartonService.allCartones(partida);
  }

  @Get('/cantidad')
  async cantidadDeCartonesPorPartida(): Promise<any> {
    return await this.cartonService.cantidadDeCartonesPorPartida();
  }

  @Get('/comprados/:partida')
  async cartonesCompradosPorPartida(
    @Param('partida') partida: number,
  ): Promise<any> {
    return await this.cartonService.cartonesCompradosPorPartida(partida);
  }

  @Get('bypartida/:partidaId')
  async findByPartida(
    @Param('partidaId', ParseIntPipe) partidaId: number,
  ): Promise<Carton[]> {
    return await this.cartonService.findByPartida(partidaId);
  }
  @Get('/usuario/:idUser/partida/:partidaId')
  async findCartonesByUserAndPartida(
    @Param('idUser', ParseIntPipe) idUser: number,
    @Param('partidaId', ParseIntPipe) partidaId: number,
  ): Promise<Carton[]> {
    return await this.cartonService.findCartonesByUserAndPartida(
      idUser,
      partidaId,
    );
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Carton> {
    const carton = await this.cartonService.findOne(id);
    return carton;
  }

  /*@Post()
  @HttpCode(HttpStatus.CREATED)
  createMany(@Body() cartones: CreateCartonDto[]):Promise<Carton[]> {
    return this.cartonService.createMany(cartones);
  }*/
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCartonDto: CreateCartonDto) {
    return this.cartonService.create(createCartonDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCartonDto: UpdateCartonDto,
  ): Promise<Carton> {
    const updatedCarton = await this.cartonService.update(id, updateCartonDto);
    return updatedCarton;
  }

  //@UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.cartonService.delete(id);
  }

  @Patch('actualizar-aciertos/:cartonId')
  public async actualizarAciertosCarton(
    @Param('cartonId') cartonId: number,
    @Body('aciertos') aciertos: number,
  ): Promise<Carton> {
    return await this.cartonService.actualizarAciertosCarton(
      cartonId,
      aciertos,
    );
  }

  @Patch('/asignar-usuario/:cartonId')
  async asignarUsuario(
    @Param('cartonId', ParseIntPipe) cartonId: number,
    @Body('usuarioId', ParseIntPipe) usuarioId: number,
  ): Promise<Carton> {
    return await this.cartonService.asignarUsuario(cartonId, usuarioId);
  }
}
