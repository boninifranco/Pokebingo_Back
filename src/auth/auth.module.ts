import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegistroModule } from 'src/registro/registro.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    RegistroModule,
  JwtModule.register({
    global:true,
    secret: jwtConstants.secret,
    signOptions: {expiresIn:'5m'},
  })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
