import { IsBoolean, IsInt} from "class-validator";

export class CreateCasilleroDto {
    @IsBoolean()
    salio: boolean;
    @IsInt()
    filaId: number;
    @IsInt()
    imagenId: number;
}