import { Module } from '@nestjs/common';
import { FilaController } from '../filas/controllers/fila.controller';
import { FilaService } from '../filas/service/fila.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fila } from './entities/fila.entity';
import { Casillero } from 'src/casilleros/entities/casillero.entity';
import { Carton } from 'src/cartones/entities/carton.entity';
import { MessagesWsModule } from 'src/messages-ws/messages-ws.module';
import { MessagesWsService } from 'src/messages-ws/messages-ws.service';
import { MessagesWsGateway } from 'src/messages-ws/messages-ws.gateway';
//import {FilasGateway} from './filas.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Fila, Casillero, Carton])],
  controllers: [FilaController],
  providers: [FilaService],
  exports:[FilaService]
})
export class FilaModule {}
