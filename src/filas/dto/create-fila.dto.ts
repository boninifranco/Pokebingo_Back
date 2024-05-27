import { IsNotEmpty, IsString } from "class-validator";

export class CreateFilaDto {
  @IsNotEmpty()
  @IsString()
    readonly nombre: string;
  }