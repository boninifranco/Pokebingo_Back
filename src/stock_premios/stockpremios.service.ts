import {  BadRequestException,  HttpException,  HttpStatus,  Injectable,} from '@nestjs/common';
import { CreateStockPremiosDto } from './dto/create-stockpremios.dto';
import { UpdateStockPremiosDto } from './dto/update-stockpremios.dto';
import { StockPremios } from './entities/stockpremios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { PremiosService } from 'src/premios/premios.service';
import { error } from 'console';

@Injectable()
export class StockPremiosService {
  constructor(
    @InjectRepository(StockPremios)
    private readonly stockPremiosRepository: Repository<StockPremios>,
    private readonly premiosService: PremiosService,
  ) {}
  async create(
    createStockPremiosDto: CreateStockPremiosDto,
  ): Promise<StockPremios> {
    const isPremio = await this.premiosService.findOne(
      Number(createStockPremiosDto.premio),
    );
    if (!isPremio)
      throw new error(
        `No existe el premio con id ${createStockPremiosDto.premio}`,
      );

    const isPremioStock = await this.findPremiosId(
      createStockPremiosDto.premio,
    );
    if (isPremioStock)
      throw new BadRequestException(
        `Ya existe un registro de stock para el premio con id ${createStockPremiosDto.premio}`,
      );
    try {
      const newStockPremios: StockPremios = this.stockPremiosRepository.create(
        createStockPremiosDto,
      );
      return await this.stockPremiosRepository.save(newStockPremios);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll(): Promise<StockPremios[]> {
    try {
      const stockPremios = await this.stockPremiosRepository.find();
      if (stockPremios.length === 0)
        throw new BadRequestException(
          `No se encontraron stocksPremios en la base de datos`,
        );
      return stockPremios;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOne(id: number): Promise<StockPremios> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const stockPremios = await this.stockPremiosRepository.findOne(criterio);
      if (!stockPremios)
        throw new BadRequestException(
          `No se encontró el stockPremio con id ${id} en la base de datos`,
        );
      return stockPremios;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    id: number,
    updateStockPremiosDto: UpdateStockPremiosDto,
  ): Promise<StockPremios> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const stockPremios = await this.stockPremiosRepository.findOne(criterio);
      if (!stockPremios)
        throw new BadRequestException(
          `No se pudo actualizar el stockPremio con id ${id} en la base de datos`,
        );
      stockPremios.cantidad = updateStockPremiosDto.cantidad;
      stockPremios.premio = Number(updateStockPremiosDto.premio);
      await this.stockPremiosRepository.update(id, stockPremios);
      return stockPremios;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number) {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const stockPremios = await this.stockPremiosRepository.findOne(criterio);
      if (!stockPremios)
        throw new BadRequestException(
          `No se encontró el stockPremio con id ${id} en la base de datos`,
        );
      await this.stockPremiosRepository.delete(id);
      return `Se ha eliminado el stock premios con id ${id}`;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Se produjo un error al enviar la petición ${error}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findPremiosId(premio: number): Promise<StockPremios> {
    const premioId = await this.stockPremiosRepository
      .createQueryBuilder('stockPremios')
      .where('stockPremios.premio = :premio', { premio })
      .getOne();

    return premioId;
  }
}
