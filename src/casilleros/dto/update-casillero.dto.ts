import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateCasilleroDto } from 'src/casilleros/dto/create-casillero.dto';

export class UpdateCasilleroDto extends PartialType(CreateCasilleroDto) {
@IsNotEmpty()
@IsString()
readonly someField: string;

@IsNotEmpty()
@IsNumber()
readonly anotherFeild: number;
}
