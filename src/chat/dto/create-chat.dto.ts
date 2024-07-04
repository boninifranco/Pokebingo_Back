import { IsInt, IsString } from "class-validator";

export class CreateChatDto {

    @IsString()
    mensaje: string;

    @IsInt()
    salaId: number;
}
