import { Test, TestingModule } from '@nestjs/testing';
import { PremiosController } from './premios.controller';
import { PremiosService } from './premios.service';

describe('PremiosController', () => {
  let controller: PremiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PremiosController],
      providers: [PremiosService],
    }).compile();

    controller = module.get<PremiosController>(PremiosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
