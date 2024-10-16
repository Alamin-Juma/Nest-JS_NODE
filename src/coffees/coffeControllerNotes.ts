

import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { response } from 'express';

@Controller('coffees')
export class CoffeesController {
    @Get('flavours')
    findAll(@Res() response) {
        // return 'This Action returns all the coffees'
        response.status(200).send( 'This Action returns all the coffees')
    }

    // @Get(':id')
    // findOne(@Param() params) {
    //     return `'This Action returns #${params.id} coffee`
    // }
    //http://localhost:3000/coffees/123
    //passing the id directly
    @Get(':id')
    findOne(@Param('id') id: string) {
        return `'This Action returns #${id} coffee`
    }

    // post req with the body 
    // http://localhost:3000/coffees
    // {
    //     "username": "Ali345",
    //     "password": "234567"
    // }
    //access the whole body
    @Post()
    //more control to add dynamic status code
    @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        return body
    }

    //use this with caution
    @Post('accessOne')
    createAccessOne(@Body('username') body) {
        return body
    }
    // Ali345


}



//route parameters

//while this approach may be good, leaving the defaults ways of 

//route parameters

//while this approach may be good, leaving the defaults ways of better  bcz you will loose platform dependent and harder to test
//use nest response obj instead