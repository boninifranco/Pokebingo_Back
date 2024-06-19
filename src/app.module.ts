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
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodosPagoModule } from './metodos_pago/metodospago.module';
import { PremiosModule } from './premios/premios.module';
import { StockPremiosModule } from './stock_premios/stockpremios.module';
import { PuntajesModule } from './puntajes/puntajes.module';
import { CasilleroModule } from './casilleros/casillero.module';
import { FilaModule } from './filas/fila.module';
import { ImagenModule } from './imagenes/imagen.module';

@Module({
   imports:[
    TypeOrmModule.forRoot({
       type: 'mysql',
       host: 'localhost',
       port: 3306,
       username: 'root',
       password: 'admin',
       database: 'bingo',
       entities: ['dist/**/**.entity{.ts,.js}'],
       synchronize: true,
     }),
    UsuarioModule,
    LogueoModule,
    RegistroModule,
    DesempenoModule,
    SalaModule,
    PartidasModule,
    TorneosModule,
    ChatModule,
    CartonModule,
    CasilleroModule,
    FilaModule,
    ImagenModule
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
