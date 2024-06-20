import { Module } from '@nestjs/common';
import { CartonService } from './servicies/carton.service';
import { CartonController } from './controllers/carton.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carton } from './entities/carton.entity';
import { Partida } from 'src/partidas/entities/partida.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Carton, Partida
    ])
  ],
  controllers: [CartonController], 
  providers: [CartonService], 
})
export class CartonModule {} 
