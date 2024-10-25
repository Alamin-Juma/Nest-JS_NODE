import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "./coffee.entities";

@Entity()
export class Flavour {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Coffee, (coffee) => coffee.flavors)
    coffees: Coffee[]
}
