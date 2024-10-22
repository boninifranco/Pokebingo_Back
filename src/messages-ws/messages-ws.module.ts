import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fila } from 'src/filas/entities/fila.entity';
import { FilaService } from 'src/filas/service/fila.service';
import { FilaModule } from 'src/filas/fila.module';

@Module({
  imports: [FilaModule],
  providers: [MessagesWsGateway,MessagesWsService],
  //exports:[MessagesWsService]
})
export class MessagesWsModule {}
