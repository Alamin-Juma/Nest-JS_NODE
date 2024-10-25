import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional() // no error if not passed /undefined
    @IsPositive() //Checks if the value is a positive number greater than zero.
    // @Type(() => Number)
    limit: number;


    @IsOptional()
    @IsPositive() 
    // @Type(() => Number) // automatically transformed on main ts  transformOptions: {enableImplicitConversion: true}
    offset: number;
}
