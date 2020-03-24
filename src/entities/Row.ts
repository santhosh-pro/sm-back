import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Template} from "./Template";
import {Cell} from "./Cell";


@Entity()
export class Row {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => Template,
            template => template.rows
        )
    template: Template

    @OneToMany(
        type => Cell,
        cell => cell.row
        )
    cells: Cell[];
}