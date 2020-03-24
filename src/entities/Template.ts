import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Row} from "./Row";
import {Col} from "./Col";
import {Cell} from "./Cell";

@Entity()
export class Template {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        type => Row,
            row => row.template,
        {eager:true}
        )
    rows: Row[]

    @OneToMany(
        type => Col,
        row => row.template,
        {eager:true}
    )
    columns: Col[];

    @OneToMany(
        type => Cell,
        cell => cell.template
    )
    cells: Cell[];
}