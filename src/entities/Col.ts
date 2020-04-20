import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany, ManyToMany, JoinTable, OneToOne
} from "typeorm";
import {Template} from "./Template";
import {Cell} from "./Cell";
import {Tree} from "./Tree";
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

    @ManyToOne(
        type => Template,
        template => template.columns
    )
    template: Template;


    @ManyToMany(type => Tree)
    @JoinTable()
    tree: Tree;

    @ManyToMany(type => Template,{cascade:true})
    @JoinTable({name: 'link'})
    link: Template[];

    @ManyToMany(type => Converter)
    @JoinTable()
    converter: Converter;

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