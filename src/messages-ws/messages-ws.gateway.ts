import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { FilaService } from 'src/filas/service/fila.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Fila } from 'src/filas/entities/fila.entity';
import { Repository } from 'typeorm';

@WebSocketGateway({
  cors: true,
  pingInterval: 25000, // Enviar un ping cada 25 segundos
  pingTimeout: 60000, // Ajusta el tiempo de espera para el ping en milisegundos
})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect{
  
  @WebSocketServer() wss: Server;
  constructor(    
    private readonly messagesWsService: MessagesWsService,    
    )
    
     {}
  handleConnection(client: Socket) {
    //const token = client.handshake.headers.authentication as string;   
    const user = client.handshake.query.user;
    const avatar = client.handshake.query.avatar;
    const ficha = client.handshake.query.ficha;

    console.log('Cliente conectado:', user || client.id)
    console.log('Cliente avatar:', avatar || 'no tiene avatar')
    
    this.messagesWsService.registerClient(client);
    

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())

    console.log('conectados (desde actualizados):', this.messagesWsService.getConnectedClients())
    
  }
  handleDisconnect(client: Socket) {    
    this.messagesWsService.removeClient(client.id);

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
  }

  // Cuando un cliente envía un mensaje
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { message: string}): void {
    // Reenviar el mensaje a todos los clientes conectados en la sala correspondiente
    const user = client.handshake.query.user;
    const avatar = client.handshake.query.avatar; 
    console.log(payload)
   
    this.wss.emit('receiveMessage', { user: user || client.id, avatar: avatar, message: payload.message });
  }

  @SubscribeMessage('sendReclamo')
  handleReclamo(client: Socket, payload: { reclamo: string}): void {
    // Reenviar el mensaje a todos los clientes conectados en la sala correspondiente
    const user = client.handshake.query.user;
    
    this.wss.emit('receiveReclamo', { user: user || client.id, message: payload.reclamo });
  }

  @SubscribeMessage('sendFicha')
  handleFicha(@MessageBody() data: { id: number; url: string }): void {
    // Reenviar el mensaje a todos los clientes conectados en la sala correspondiente    
    console.log('este salio', data)
   
    this.wss.emit('receiveFicha', data);
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
}
