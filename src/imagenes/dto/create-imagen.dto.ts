import { IsNotEmpty, IsString } from "class-validator";

export class CreateImagenDto {
  @IsNotEmpty()
  @IsString()
    readonly name: string;

  @IsNotEmpty()
  @IsString()
    readonly description: string;
  }
  