import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Sala } from 'src/sala/entities/sala.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Sala])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
