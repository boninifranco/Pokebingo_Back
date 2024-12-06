
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FilaService } from './service/fila.service';



@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001'
  },
})
export class FilasGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly filasService: FilaService
)
     {    
  }  
}
