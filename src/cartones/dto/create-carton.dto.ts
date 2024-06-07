import { IsNotEmpty, IsString } from "class-validator";

export class CreateCartonDto {

  @IsNotEmpty()
  @IsString()
    readonly nroCarton: string;

  @IsNotEmpty()  
    readonly idPartida: number;

  @IsNotEmpty()  
    readonly aciertos: number;
  }
  