import {IsInt} from "class-validator";

export class CreateCartonDto {

  @IsInt()
    cartonId: number;

  @IsInt()
    nroCarton: number;

  @IsInt()  
    idPartida: number;

  @IsInt()  
    aciertos: number;
  }
  