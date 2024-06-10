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
    service = module.get<CartonService>(CartonService);
    res = {} as Response; // Inicializar el objeto de respuesta
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all cartons', async () => {
    const cartons = [  
      { id: 1, Nro_Carton: 'Cartón 1', Partida: 'Partida 1', Aciertos: 5, filas: 5 },
      { id: 2, Nro_Carton: 'Cartón 2', Partida: 'Partida 2', Aciertos: 3, filas: 3 },
      { id: 3, Nro_Carton: 'Cartón 3', Partida: 'Partida 3', Aciertos: 4, filas: 4 }
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(cartons);
    expect(await controller.findAll(res)).toBe(cartons);
  });
  
  it('should create a new carton', async () => {
    const cartonDto = { Nro_Carton: 'ABC123', Partida: 'Partida1', Aciertos: 2 };
    const createdCarton = { id: 1, Nro_Carton: 'ABC123', Partida: 'Partida1', Aciertos: 2, filas: 5 };
    jest.spyOn(service, 'create').mockResolvedValue(createdCarton);
    expect(await controller.create(cartonDto, res)).toBe(createdCarton);
  });
});  
