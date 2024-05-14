import { Test, TestingModule } from '@nestjs/testing';
import { DesempenoController } from './desempeno.controller';
import { DesempenoService } from './desempeno.service';

describe('DesempenoController', () => {
  let controller: DesempenoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesempenoController],
      providers: [DesempenoService],
    }).compile();

    controller = module.get<DesempenoController>(DesempenoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
