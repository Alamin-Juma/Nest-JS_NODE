import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entities';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 3,
            name: "Nostaka Caffein",
            brand: "Buddy Brew",
            flavors: ['chocolate', 'vanilla']
        },
        {
            id: 4,
            name: "Caffein Poa",
            brand: "MtaaBoz",
            flavors: ['chocolate', 'vanilla']
        }
    ]

    findAll() {
        return this.coffees
    }

    findOne(id: string) {
        // throw 'A random error'
        const coffee =  this.coffees.find((item) => item.id === +id)
        if(!coffee) {
            // throw new HttpException(`Coffee #{id} not found`, HttpStatus.NOT_FOUND)
            throw new NotFoundException(`Coffee #{id} not found`)
        }
        return coffee
    }

    create(createCoffeeDto: any){
         this.coffees.push(createCoffeeDto)
         return createCoffeeDto
    }

    update(id:string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id)
        if(existingCoffee){
            //update the existing entity
             updateCoffeeDto =  {...existingCoffee, ...updateCoffeeDto}
             return updateCoffeeDto
        }
    } 
 
    remove(id:string){
        const coffeeIndex = this.coffees.findIndex((item) => item.id === +id)
        if(coffeeIndex > 0) {
            this.coffees.splice(coffeeIndex,1)
        }
    }
}
