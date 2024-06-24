import { Test, TestingModule } from '@nestjs/testing';
import { DesempenioController } from './desempenio.controller';
import { DesempenioService } from './desempenio.service';

describe('DesempenioController', () => {
  let controller: DesempenioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesempenioController],
      providers: [DesempenioService],
    }).compile();

    controller = module.get<DesempenioController>(DesempenioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
