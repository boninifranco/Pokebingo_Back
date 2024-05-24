import { IsNotEmpty, IsString } from "class-validator";

export class UpdateFilaDto {
  @IsNotEmpty()
  @IsString()
    readonly nombre: string;
  }
  