import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { FilaService } from 'src/filas/service/fila.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Fila } from 'src/filas/entities/fila.entity';
import { Repository } from 'typeorm';

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect{
  
  @WebSocketServer() wss: Server;
  constructor(
    //@InjectRepository(Fila) private readonly filaRepository: Repository<Fila>,
    //private readonly filaService : FilaService,
    private readonly messagesWsService: MessagesWsService,
    //private readonly filaService: FilaService
    )
    
     {}
  handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    console.log({token})
    //console.log('Cliente conectado:', client.id)
    this.messagesWsService.registerClient(client);
    

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())

    console.log('conectados:', this.messagesWsService.getConnectedClients())
    
  }
  handleDisconnect(client: Socket) {
    //console.log('Cliente desconectado:', client.id)
    this.messagesWsService.removeClient(client.id);

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
    //console.log('conectados:', this.messagesWsService.getConnectedClients())
    
  }

  // Cuando un cliente envía un mensaje
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { message: string, salaId: string }): void {
    // Reenviar el mensaje a todos los clientes conectados en la sala correspondiente
    console.log(payload)
    //this.wss.to(payload.salaId).emit('receiveMessage', { user: client.id, message: payload.message });
    this.wss.emit('receiveMessage', { user: client.id, message: payload.message });
  }

  /*@SubscribeMessage('message-from-client')
  hadleMessageFromClient( client: Socket, payload: NewMessageDto){
    //console.log(client.id, payload)
    //Emite solo al cliente que lo envio
    //client.emit('message-from-server', {
      //fullName: 'Soy yo!',
      //message: payload.message || 'no-message'
    //})

    //Emite a todos MENOS al cliente que lo envio
    //client.broadcast.emit('message-from-server', {
      //fullName: 'Soy yo!',
      //message: payload.message || 'no-message'
    //})

    this.wss.emit('message-from-server', {
      fullName: 'Soy yo!',
      message: payload.message || 'no-message'
    })

  }*/

  

  // Método para emitir filas actualizadas
  /*async sendUpdatedFilas() {
    const filas = await this.filaService.findAllDesc(); // Obtener las filas actualizadas
    this.wss.emit('filas', filas); // Emitir a todos los clientes conectados
  }*/
}
