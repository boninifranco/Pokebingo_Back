import { IsNumber } from "class-validator";
import { ImgSeleccionada } from "../entities/img-seleccionada.entity";

export class CreateImgSeleccionadaDto {

    @IsNumber()
    partidaId: number

    @IsNumber()
    imagenId: number
}
