import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Flavour } from "./flavour.entity";

@Entity() //sql table === 'coffee' in lowercase
//passing a string like @Entity('coffee') creates a table called coffee
//leaving it empty will use the class as the name for the table 
export class Coffee {
    //column decorator is used to mark a specific class property as a table column.

    @PrimaryGeneratedColumn() //primary column prop
    id: number;

    @Column() //normal column name
    name: string;

    @Column()
    brand: string;

    @Column({nullable: true})
    description: string

    //recommendation column
    @Column({default: 0})
    recommendations: number;

    @JoinTable() // this decorator should be on the owning side
    @ManyToMany(
        () => Flavour,
        (flavour) => flavour.coffees,
        { cascade: true } // optional: enables cascade operations
    )
    flavors: Flavour[];
}