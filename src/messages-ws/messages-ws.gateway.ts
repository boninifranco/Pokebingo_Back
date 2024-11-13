import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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
    //@InjectRepository(Fila) private readonly filaRepository: Repository<Fila>,
    //private readonly filaService : FilaService,
    private readonly messagesWsService: MessagesWsService,
    //private readonly filaService: FilaService
    )
    
     {}
  handleConnection(client: Socket) {
    //const token = client.handshake.headers.authentication as string;
    //console.log({token})
    const user = client.handshake.query.user;
    const avatar = client.handshake.query.avatar;
    console.log('Cliente conectado:', user || client.id)
    console.log('Cliente avatar:', avatar || 'no tiene avatar')
    
    this.messagesWsService.registerClient(client);
    

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())

    console.log('conectados (desde actualizados):', this.messagesWsService.getConnectedClients())
    
  }
  handleDisconnect(client: Socket) {
    //console.log('Cliente desconectado:', client.id)
    this.messagesWsService.removeClient(client.id);

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients())
    //console.log('conectados (desde desconectados):', this.messagesWsService.getConnectedClients())
    
  }

  // Cuando un cliente envía un mensaje
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { message: string}): void {
    // Reenviar el mensaje a todos los clientes conectados en la sala correspondiente
    const user = client.handshake.query.user;
    const avatar = client.handshake.query.avatar; 
    console.log(payload)

    //this.wss.to(payload.salaId).emit('receiveMessage', { user: client.id, message: payload.message });
    this.wss.emit('receiveMessage', { user: user || client.id, avatar: avatar, message: payload.message });
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
