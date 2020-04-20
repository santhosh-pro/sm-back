import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Template} from "./Template";
import {Row} from "./Row";
import {Col} from "./Col";
import {Tree} from "./Tree";
import {ConverterValue} from "./ConverterValue";


@Entity()
export class Cell {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "integer"})
    intVal: number;

    @Column({type: "double"})
    doubleVal: number;

    @Column({type: "varchar"})
    varcharVal: string;

    @Column({type: "text"})
    textVal: string;

    @Column()
    booleanVal: boolean;

    @ManyToOne(
        type => Row,
        row => row.cells
    )
    row: Row;

    @ManyToOne(
        type => Col,
        col => col.cells,
        {eager: true}
    )
    column: Col;

    @ManyToOne(
        type => Template,
        col => col.cells
    )
    template: Template;

    @ManyToMany(type => Tree)
    @JoinTable()
    tree: Tree;

    @ManyToMany(type => Row,{eager: true})
    @JoinTable()
    link: Row[];

    @ManyToMany(type => ConverterValue)
    @JoinTable()
    converterValue: ConverterValue;


    @CreateDateColumn({type: "timestamp"})
    createdAt: string;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: string;
}