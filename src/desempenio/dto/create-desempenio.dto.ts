import { IsInt, IsOptional, Min } from 'class-validator';

export class CreateDesempenioDto {
  @IsInt()
  jugador: number;

  @IsInt()
  @Min(0)
  puntos: number;

  @IsInt()
  @Min(0)
  creditos: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  cartonesComprados?: number;
}
