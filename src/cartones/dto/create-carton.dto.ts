import {IsInt} from "class-validator";

export class CreateCartonDto {

  @IsInt()
    nroCarton: number;

  @IsInt()  
    idPartida: number;

  @IsInt()  
    aciertos: number;
  }
  