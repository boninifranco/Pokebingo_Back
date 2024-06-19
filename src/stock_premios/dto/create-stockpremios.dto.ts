import { IsInt } from "class-validator";
import { Premios } from "src/premios/entities/premios.entity";

export class CreateStockPremiosDto {
    @IsInt()
    premio: Premios;
    @IsInt()
    cantidad: number;
}
