import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entities';
import { Flavour } from './entities/flavour.entity';

//before we had CoffeesController and CoffeeService as the overall  app module
//make sure they are removed on the app module to avoid two instantiation  
@Module({
    //Event entitiy -  An event which takes place in the DOM.
    imports: [TypeOrmModule.forFeature([Coffee, Flavour, Event])],
    controllers: [CoffeesController],
    providers: [CoffeesService]
})
export class CoffeesModule { }
