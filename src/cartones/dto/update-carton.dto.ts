import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCartonDto {

  @IsNotEmpty()
  @IsString()
    readonly Partida?: string;

  @IsNotEmpty()
  @IsNumber()
    readonly Aciertos?: number;
  }
  