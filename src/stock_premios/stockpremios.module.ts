import { Module } from '@nestjs/common';
import { StockPremiosService } from './stockpremios.service';
import { StockPremiosController } from './stockpremios.controller';

@Module({
  controllers: [StockPremiosController],
  providers: [StockPremiosService],
})
export class StockPremiosModule {}
