// src/filas/filas.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FilaService } from './service/fila.service';
//import { FilaModule } from './fila.module';


@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001'//'*', // Asegúrate de configurar los orígenes permitidos
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

  // Método para emitir los cambios en las filas
  //emitFilasUpdate() {
    // Obtenemos las filas desde el servicio (o directamente de la base de datos)
    //const filas = this.filasService.findAllDesc(); // Debes ajustar para que obtenga correctamente las filas
    //his.server.emit('updateFilas', filas); // Enviamos el evento "updateFilas" a todos los clientes conectados
  //}
}
