import { IsBoolean, IsInt} from "class-validator";

export class CreateCasilleroDto {

    @IsInt()
    casilleroId: number;
    @IsBoolean()
    salio: boolean;
    @IsInt()
    filaId: number;
    @IsInt()
    imagenId: number;
}