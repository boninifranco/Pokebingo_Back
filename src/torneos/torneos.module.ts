import { Module } from '@nestjs/common';
import { TorneosService } from './torneos.service';
import { TorneosController } from './torneos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Torneo } from './entities/torneo.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Torneo
    ])
  ],
  controllers: [TorneosController],
  providers: [TorneosService],
})
export class TorneosModule {}
