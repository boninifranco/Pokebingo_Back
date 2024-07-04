import { Test, TestingModule } from '@nestjs/testing';
import { FilaController } from '../controllers/fila.controller';
import { FilaService } from '../service/fila.service';

describe('FilaController', () => {
  let controller: FilaController;
  let service: FilaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilaController],
      providers: [FilaService],
    }).compile();

    controller = module.get<FilaController>(FilaController);
    service = module.get<FilaService>(FilaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});