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

  it('should return all casilleros', async () => {
    const casilleros = await controller.getAllCasilleros();
    expect(casilleros).toBeDefined();
  });

  it('should create a casillero', async () => {
    const newCasillero: CreateCasilleroDto = {
      filaId: '',
      numero: 0,
      contenido: ''
    };
    const createdCasillero = await controller.createCasillero(newCasillero);
    expect(createdCasillero).toBeDefined();
  });

  it('should delete a casillero', async () => {
    const casilleroId = '123'; // Define un ID de casillero existente aquí
    const deletedCasillero = await controller.deleteCasillero(casilleroId);
    expect(deletedCasillero).toBeDefined();
  });
});
