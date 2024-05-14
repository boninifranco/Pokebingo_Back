import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { RegistroModule } from './registro/registro.module';
import { LogueoModule } from './logueo/logueo.module';
import { DesempenoModule } from './desempeno/desempeno.module';
import { SalaModule } from './sala/sala.module';
import { TorneosModule } from './torneos/torneos.module';
import { PartidasModule } from './partidas/partidas.module';
import { ChatModule } from './chat/chat.module';
import { CartonModule } from './cartones/carton.module';

@Module({
  imports: [UsuarioModule, RegistroModule, LogueoModule,
     DesempenoModule, SalaModule, TorneosModule,
      PartidasModule, ChatModule, CartonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
