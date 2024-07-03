import { Test, TestingModule } from '@nestjs/testing';
import { CasilleroController } from '../controllers/casillero.controllers';
import { CasilleroService } from '../service/casillero.service';
import { CreateCasilleroDto } from '../dto/create-casillero.dto';
import { UpdateCasilleroDto } from '../dto/update-casillero.dto';
describe('CasilleroController', () => {
  let controller: CasilleroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CasilleroController],
      providers: [CasilleroService],
    }).compile();

    controller = module.get<CasilleroController>(CasilleroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
