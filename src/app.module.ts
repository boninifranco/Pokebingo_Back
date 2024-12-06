import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { RegistroModule } from './registro/registro.module';
import { LogueoModule } from './logueo/logueo.module';
import { DesempenioModule } from './desempenio/desempenio.module';
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
import { AuthModule } from './auth/auth.module';
import { ImgSeleccionadasModule } from './img-seleccionadas/img-seleccionadas.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';
import { ResultadosModule } from './resultados/resultados.module';
import { MercadoPagoModule } from './mercadopago/mercadopago/mercadopago.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { MailModule } from './mail/mail.module';
import { MailController } from './mail/mail.controller';

@Module({
   imports:[
    ConfigModule.forRoot(
      {
        load:[ EnvConfiguration]
      }),
    TypeOrmModule.forRoot({
       type: 'mysql',
       host: process.env.HOST,
       port: +process.env.DBPORT,
       username: process.env.DBUSERNAME,
       password: process.env.PASSWORD,
       database: process.env.DATABASE,
       entities: [process.env.ENTITIES],//['dist/**/**.entity{.ts,.js}'],
       //entities: [__dirname + '/**/*.entity{.ts,.js}'],
       synchronize: true
     }),
    UsuarioModule,
    LogueoModule,
    RegistroModule,
    DesempenioModule,
    MetodosPagoModule,
    PremiosModule,
    StockPremiosModule,
    PuntajesModule,
    SalaModule,
    PartidasModule,
    TorneosModule,
    ChatModule,
    CartonModule,
    CasilleroModule,
    FilaModule,
    ImagenModule,
    AuthModule,
    ImgSeleccionadasModule,
    MessagesWsModule,
    ResultadosModule,
    MercadoPagoModule,
    FilesModule,
    MailModule
   ],
  controllers: [AppController, MailController],
  providers: [AppService],
})
export class AppModule {
  constructor(){}
}
