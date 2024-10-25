import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { response } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
    //constructor used to inject service
    //private - allows to both declare and initialize coffeservcice member immedielty and utilize it on its private scope
    //readonly - ensure that we dont modify the reference
    //typescrpt coffeeService of type CoffeeService
    constructor(private readonly coffeesService: CoffeesService){}


    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        // const {limit, offset} = paginationQuery
        // return `This Action returns all the coffees. Limit: ${limit}, offst: ${offset}` //http://localhost:3000/coffees?limit=20&offset=10
        //This Action returns all the coffees. Limit: 20, offst: 10
        //lets pass in the paginationQuery  in findAll  
        return this.coffeesService.findAll(paginationQuery)
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        // return `'This Action returns #${id} coffee`
        console.log(typeof id)
        return this.coffeesService.findOne('' + id)
    }

    @Post()
    create(@Body() createCoffeeDto:CreateCoffeeDto) {
        // return body
        console.log(createCoffeeDto instanceof CreateCoffeeDto) //false
        return this.coffeesService.create(createCoffeeDto)
    }

    @Post('accessOne')
    createAccessOne(@Body('username') body) {
        return body
    }
    // Ali345

    @Patch(':id')
    // @HttpCode(HttpStatus.OK)
    updatePartial(@Param('id') id: string, @Body() body) {
        // return `This action updates partial data for coffee with ID #${id}`;
        return this.coffeesService.update(id, body)
    }

    @Delete(':id')
    // @HttpCode(HttpStatus.OK)
    delete(@Param('id') id: string) {
        // return `This action removes data for coffee with ID #${id}`;
        return this.coffeesService.remove(id)
    }
    
}