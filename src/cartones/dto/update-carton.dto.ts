import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateCartonDto } from "./create-carton.dto";

export class UpdateCartonDto extends PartialType(CreateCartonDto) { }
  