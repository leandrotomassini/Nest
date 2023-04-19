import { IsString, MinLength } from "class-validator";

import { Brand } from "../entities/brand.entity";

export class CreateBrandDto {

    @IsString()
    @MinLength(1)
    name: string;


}
