import { Module } from '@nestjs/common';
import { StockPremiosService } from './stockpremios.service';
import { StockPremiosController } from './stockpremios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockPremios } from './entities/stockpremios.entity';
import { Premios } from 'src/premios/entities/premios.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      StockPremios,Premios
    ]),
  ],
  controllers: [StockPremiosController],
  providers: [StockPremiosService],
})
export class StockPremiosModule {}
