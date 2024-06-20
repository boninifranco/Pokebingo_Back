import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { CreateFilaDto } from "./create-fila.dto";

export class UpdateFilaDto extends PartialType(CreateFilaDto) {}