import { Test, TestingModule } from '@nestjs/testing';
import { CartonController } from './carton.controller';
import { CartonService } from '../servicies/carton.service';
import { Response } from 'express';

describe('CartonController', () => {
  let controller: CartonController;
  let service: CartonService;
  let res: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartonController],
      providers: [CartonService],
    }).compile();

    controller = module.get<CartonController>(CartonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});  
