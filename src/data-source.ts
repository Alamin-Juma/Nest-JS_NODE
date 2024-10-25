// src/data-source.ts
import { DataSource } from "typeorm";
import { Coffee } from "./coffees/entities/coffee.entities";
import { Flavour } from "./coffees/entities/flavour.entity";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "pass123",
    database: "postgres",
    synchronize: false,
    logging: true,
    entities: [Coffee, Flavour],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
});