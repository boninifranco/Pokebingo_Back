import { Module } from '@nestjs/common';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sala } from './entities/sala.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { Partida } from 'src/partidas/entities/partida.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sala, Chat, Partida])],
  controllers: [SalaController],
  providers: [SalaService],
})
export class SalaModule {}
