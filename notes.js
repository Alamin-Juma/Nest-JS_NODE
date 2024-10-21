//running nest on watch mode  
pnpm run start:dev 

generating a new controller - nest g co 

//to generate controller i side a certain module 
nest g co modules/abc
nest g co modules/abc --dry-run - this means you just want to dry run and see how it would look like  


@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll() {
        return 'This Action returns all the coffees'
    }
}
this can be accessed from  http://localhost:3000/coffees

//adding flavours inside the get req, 
@Controller('coffees')
export class CoffeesController {
    @Get('flavours')
    findAll() {
        return 'This Action returns all the coffees'
    }
}
http://localhost:3000/coffees/flavours


    //more control to add dynamic status code
    @HttpCode(HttpStatus.GONE)

@Res decorator -     

//servicds help us separate business logic from our controllers 
//to generate a new service just type -  nest g s

//each service is a provider - it can inject dependencies 
//has the injectabl

@Injectable()
export class CoffeesService {}

//then in controler use it like  
constructor(private readonly coffeesService: CoffeesService){}

// as ervice class will be utilizing an entity class  

//Encompassing Business-domain in modules 
// to generate module - nest g module 
//so far, we have had the whole app in one big module, App-module
//lets add some encapsulation 
nest g module coffees

//this will be added to the closes class module 
@Module({})
export class CoffeesModule {}
inside the Module({}) - 
//one can add controllers - api routes that this module we wwant this module to instanstiate
// exports - list providers that they should be available anywhere this module is imported at
// imports - ability to list other modules required in this module
//  and providers array - list the services needed to be injected by the nest injector


//A DTO - data transfer Object used to encapsulate data and send it from one app to another 
//On post req, we can put a DTO
//to generate a DTO, we can use a nest cli 
//list the dir of the file to be generated
 //nest g class coffees/dto/create-coffee.dto --no-spec to avoid generating a test file

 //so a DTO is basically an object - no business logics, methods or any testing 
 // just typesafty for what we except to carry data as 
 //make the properties of DTO - readonly to maintain mutability


 //common data practice to validate any incoming API requests
 // cz we dont know who is sending the payload 
 //  app.useGlobalPipes(new ValidationPipe())
 //$ pnpm i class-validator class-transformer

 //we can now add validations to those DTOs 
 import  {IsString} from 'class-validator'
export class CreateCoffeeDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly brand: string;
    @IsString({each: true}) //each set of value is a string 
    readonly flavors: string[];
}


//sending this request 
{
    "name": "Nostaka Caffein"
  }
  leads to a 
  
  {
    "message": [
        "brand must be a string",
        "each value in flavors must be a string"
    ],
    "error": "Bad Request",
    "statusCode": 400
}

//nest js provides serveral utilities map-types to avoid repetions like changing all DTOs 
//types like in case of update DTO as we did weith create DTO
nest i @nestjs/mapped-types
import {PartialType} from '@nestjs/mapped-types'
import { CreateCoffeeDto } from '../create-coffee.dto/create-coffee.dto';
export class UpdateCoffeeDto  extends PartialType(CreateCoffeeDto) {
}
// The PartialType is returning the types of the class we cretaed inot it with all the props set to optional
// Partial Types marks all fields optional and inherits all the validations rules applied 
// via decorators and additional  add a single additional validation rule to each field that is optional 
//now add a patch request with string works
//but with other than strings fails  validations  

//we can add optional properties in the validation pipeline 
//example allow only properties included in the white list 
//  app.useGlobalPipes(new ValidationPipe())

app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  //for example if we want to avoid users to pass invalid properties to be automatically removed on post req
  //for this , add the CreatDto on the service to retun it to the client 
  
  create(createCoffeeDto: any){
    this.coffees.push(createCoffeeDto)
    return createCoffeeDto
}


//sending this response does not bring an error  
{
    "id": 3,
    "name": "Matakwa Caffein",
    "brand": "Boss Drinks",
    "flavors": [
        "chocolate",
        "vanilla"
    ],
    "enables": true
}
// enables flags it automatically    
retuns 201 ok with  

{
    "name": "Matakwa Caffein",
    "brand": "Boss Drinks",
    "flavors": [
        "chocolate",
        "vanilla"
    ]
}

//in addition , the validation pipelines can prevent a request processing if any non-whitelisted 
//option are passed 
//sending the req with unwanted propes returns an error 
{
    "message": [
        "property id should not exist",
        "property enables should not exist"
    ],
    "error": "Bad Request",
    "statusCode": 400
}


//auto transfer DTOs
@Post()
create(@Body() createCoffeeDto:CreateCoffeeDto) {
    // return body
    console.log(createCoffeeDto instanceof CreateCoffeeDto) //false
    return this.coffeesService.create(createCoffeeDto)
}

//to enable createCoffeeDto be an instance of CreateCoffeDto we can enable it globally  
 //in main ts  
 import { NestFactory } from '@nestjs/core';
 import { AppModule } from './app.module';
 import { ValidationPipe } from '@nestjs/common';
 
 async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe({
     whitelist: true,
     forbidNonWhitelisted: true,
     transform: true
   }))
   await app.listen(3000);
 }
 bootstrap();
 //now it becomes true  
 
 
 //this transform feature also performs primitive type conversions like bools and number s
 @Get(':id')
 findOne(@Param('id') id: number) {
     // return `'This Action returns #${id} coffee`
     console.log(typeof id) //number
     return this.coffeesService.findOne('' + id)
 }

 Chnages 