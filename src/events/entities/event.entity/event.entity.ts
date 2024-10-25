import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

//in advanced cases we may want to define composite indexes containin gmultiple columns
@Index(['name', 'type'])
@Entity()
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type:string;

    @Index()
    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>
}
