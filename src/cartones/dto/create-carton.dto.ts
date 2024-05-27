import { IsNotEmpty, IsString } from "class-validator";

export class CreateCartonDto {

  @IsNotEmpty()
  @IsString()
    readonly Nro_Carton: string;

  @IsNotEmpty()
  @IsString()
    readonly Partida: string;

  @IsNotEmpty()
  @IsString()
    readonly Aciertos: number;
  }
  