import { Module } from '@nestjs/common';
import { CartonService } from './servicies/carton.service';
import { CartonController } from './controllers/carton.controller';

@Module({
  controllers: [CartonController], 
  providers: [CartonService], 
})
export class CartonModule {} 
