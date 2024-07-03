import { Module } from '@nestjs/common';
import { PremiosService } from './premios.service';
import { PremiosController } from './premios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Premios } from './entities/premios.entity';
import { StockPremios } from 'src/stock_premios/entities/stockpremios.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Premios,StockPremios
    ]),
  ],
  controllers: [PremiosController],
  providers: [PremiosService],
  exports: [PremiosService]
})
export class PremiosModule {}
