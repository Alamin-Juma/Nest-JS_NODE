import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule], //broke the business structure to its module 
  //to contain CoffeeServoice and CoffeeController
  // controllers: [AppController, CoffeesController],
  // providers: [AppService, CoffeesService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
