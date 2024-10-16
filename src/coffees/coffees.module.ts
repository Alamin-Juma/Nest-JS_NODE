import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

//before we had CoffeesController and CoffeeService as the overall  app module
//make sure they are removed on the app module to avoid two instantiation  
@Module({controllers: [CoffeesController], providers: [CoffeesService]})
export class CoffeesModule {}
