import { PartialType } from "@nestjs/mapped-types";
import { CreateImagenDto } from "./create-imagen.dto";
import { IsString } from "class-validator";

export class UpdateImagenDto extends PartialType(CreateImagenDto) {
    @IsString()
    imagen: string;
}