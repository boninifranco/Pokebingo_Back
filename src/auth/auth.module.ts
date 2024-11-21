import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegistroModule } from 'src/registro/registro.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { LogueoModule } from 'src/logueo/logueo.module';
import { CreateLogueoDto } from 'src/logueo/dto/create-logueo.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    RegistroModule,
    PassportModule.register({defaultStrategy:'jwt'}),      
    /*JwtModule.registerAsync({
      imports:[],
      inject:[],
      useFactory: ()=>{
        //console.log('jwt_secret',configService.get('secret'))
        console.log('JWT_SECRET',process.env.SECRET)
        return{
          global: true,
          secret: process.env.SECRET,
          signOptions: { expiresIn: '5m' },
        }
      }
    })*/
    
        
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '5m' },
        }),   
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
