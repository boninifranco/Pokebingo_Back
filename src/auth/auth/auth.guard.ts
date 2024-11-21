import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,  
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthGuard implements CanActivate {
  private secretJwt : string;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    console.log(this.configService.get('secret'))
    this.secretJwt = this.configService.get('secret')
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const secret = this.configService.getOrThrow(this.configService.get('secret'))
    console.log(secret)
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
        //secret: this.secretJwt
      });
      
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
