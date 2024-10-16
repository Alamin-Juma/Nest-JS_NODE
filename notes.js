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