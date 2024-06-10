import { IsInt } from "class-validator";

export class CreateStockPremiosDto {
    @IsInt()
    premio: number;
    @IsInt()
    cantidad: number;
}
