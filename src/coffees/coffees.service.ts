import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Flavour } from './entities/flavour.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { EventEntity } from 'src/events/entities/event.entity/event.entity';

@Injectable()
export class CoffeesService {
    // private coffees: Coffee[] = [
    //     {
    //         id: 3,
    //         name: "Nostaka Caffein",
    //         brand: "Buddy Brew",
    //         flavors: ['chocolate', 'vanilla']
    //     },
    //     {
    //         id: 4,
    //         name: "Caffein Poa",
    //         brand: "MtaaBoz",
    //         flavors: ['chocolate', 'vanilla']
    //     }
    // ]

    //we can now onject our rpository to our data source 
    //repalce each method replace mock data interaction and use the new repository
    // we will use async await to update asynchronousely
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavour)
        private readonly flavourRepository: Repository<Flavour>,
        private readonly connection: Connection,
    ) { }

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery
        //offset means skip the number of items 
        //http://localhost:3000/coffees?offset=1 ---skip one item and return the rest
        //http://localhost:3000/coffees?limit=1   ----return one item
        // return this.coffees
        //we can customize the find to return the relations for FindManyToMany
        return this.coffeeRepository.find({
            relations: ['flavors'], //this is flavors in Coffee entity ,
            skip: offset,
            take: limit
        })
    }

    async findOne(id: string) {
        // throw 'A random error'
        // const coffee =  this.coffees.find((item) => item.id === +id)
        //findOne({ where: { id: +id } }): This ensures that you're passing an object with the id field, which matches the expected FindOneOptions<Coffee> format.
        const coffee = await this.coffeeRepository.findOne({
            where: { id: +id },
            relations: ['flavors'],
        })
        if (!coffee) {
            // throw new HttpExcep tion(`Coffee #{id} not found`, HttpStatus.NOT_FOUND)
            throw new NotFoundException(`Coffee #{id} not found`)
        }
        return coffee
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        //resolving all promises before executing furthur code
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavourName(name))
        )

        //  this.coffees.push(createCoffeeDto)
        const newCoffee = this.coffeeRepository.create({
            ...createCoffeeDto,
            flavors,
        });
        // Save the created coffee to the database
        return this.coffeeRepository.save(newCoffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        //makeing sure we have the flavours first before calling a map on each one of them
        const flavors = updateCoffeeDto.flavors &&
            (await Promise.all(
                updateCoffeeDto.flavors.map(name => this.preloadFlavourName(name))
            ))
        // const existingCoffee = this.findOne(id)
        //Creates a new entity from the given plain javascript object. If entity already exist in the database, then it loads it (and everything related to it), replaces all values with the new ones from the given object and returns this new entity. This new entity is actually a loaded from the db entity with all properties replaced from the new object.
        // Note that given entity-like object must have an entity id / primary key to find entity by. Returns undefined if entity with given id was not found.
        const existingCoffee = await this.coffeeRepository.preload({ id: +id, ...updateCoffeeDto, flavors })
        if (!existingCoffee) {
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return this.coffeeRepository.save(existingCoffee);
    }

    async remove(id: string) {
        // const coffeeIndex = this.coffees.findIndex((item) => item.id === +id)
        // Check if the coffee exists before attempting to remove it
        const coffee = await this.coffeeRepository.findOne({ where: { id: +id } });

        // if (coffeeIndex > 0) {
        //     this.coffees.splice(coffeeIndex, 1)
        // }
        // Remove the coffee from the repository
        await this.coffeeRepository.remove(coffee);
    }

    async recommendCoffee(coffee: Coffee) {
        // Creates a query runner used to perform queries on a single database connection.
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            coffee.recommendations++;

            // Create an entity instance to save the event details
            const recommendEvent = queryRunner.manager.create(EventEntity, {
                name: 'recommend_coffee',
                type: 'coffee',
                payload: { coffeeId: coffee.id },
            });

            // Save the coffee entity and the recommend event entity
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            // document.dispatchEvent(), remember that it's for front-end/browser use cases. For a server-side application, dispatching may not be useful unless you have an event-handling system in place.
            // document.dispatchEvent(recommendEvent);

            // Commit the transaction after both operations are successful
            await queryRunner.commitTransaction();
        } catch (error) {
            // Rollback transaction in case of error
            await queryRunner.rollbackTransaction();
            throw error; // Optional: rethrow error to be handled by the caller
        } finally {
            // Release the query runner
            await queryRunner.release();
        }
    }


    private async preloadFlavourName(name: string): Promise<Flavour> {
        const existingFlavour = await this.flavourRepository.findOne({ where: { name: name } })
        if (existingFlavour) {
            return existingFlavour
        }
        return this.flavourRepository.create({ name })
    }
} 
