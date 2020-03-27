import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany, ManyToMany, JoinTable
} from "typeorm";
import {Template} from "./Template";
import {Cell} from "./Cell";
import {Tree} from "./Tree";
import {Dictionary} from "./Dictionary";
import {Converter} from "./Converter";


export enum CellType {
    INTEGER,
    DOUBLE,
    VARCHAR,
    TEXT,
    BOOLEAN
}

export enum ColumnType {
    SIMPLE,
    TREE,
    DICTIONARY,
    CONVERTER
}


@Entity()
export class Col {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(
        type => Template,
        template => template.columns
    )
    template: Template;


    @ManyToMany(type => Tree)
    @JoinTable()
    tree: Tree;

    @ManyToMany(type => Dictionary)
    @JoinTable()
    dictionary: Dictionary;

    @ManyToMany(type => Converter)
    @JoinTable()
    converter: Converter;

    @Column({
        type: 'enum',
        enum: CellType,
        default: CellType.VARCHAR
    })
    cellType: CellType;

    @Column({
        type: 'enum',
        enum: ColumnType,
        default: ColumnType.SIMPLE
    })
    columnType: ColumnType;

    @OneToMany(
        type => Cell,
        cell => cell.column
    )
    cells: Cell[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: string;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: string;
}