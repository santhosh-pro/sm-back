import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Template} from "./Template";
import {Converter} from "./Converter";

export enum Operator {
    ADD
}

export class Formula {
    operator: Operator;
    operand: number;
}

@Entity()
export class ConverterValue {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: "json"})
    formula: Formula[];


    @ManyToOne(
        type => Converter,
        con => con.values
    )
    converter: Converter;



    @CreateDateColumn({type: "timestamp"})
    createdAt: string;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: string;
}