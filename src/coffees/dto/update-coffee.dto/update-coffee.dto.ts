
//to avoid the properties being required on update, we will add 
// ? 
// export class UpdateCoffeeDto {
//     readonly name?: string;
//     readonly brand?: string;
//     readonly flavors?: string[];
// }
 import {PartialType} from '@nestjs/mapped-types'
import { CreateCoffeeDto } from '../create-coffee.dto/create-coffee.dto';
export class UpdateCoffeeDto  extends PartialType(CreateCoffeeDto) {
}
 