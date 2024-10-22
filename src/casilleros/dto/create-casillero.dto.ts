import { IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

export class CreateCasilleroDto {
  @IsInt()
  filaId: number;

  @IsNumber()
  imagenId: number;

  @IsBoolean()
  salio: boolean = false;

}

  
