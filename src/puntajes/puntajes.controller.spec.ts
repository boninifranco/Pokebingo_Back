import { Test, TestingModule } from '@nestjs/testing';
import { PuntajesController } from './puntajes.controller';
import { PuntajesService } from './puntajes.service';

describe('PuntajesController', () => {
  let controller: PuntajesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuntajesController],
      providers: [PuntajesService],
    }).compile();

    controller = module.get<PuntajesController>(PuntajesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
