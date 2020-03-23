import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Template} from "./Template";


@Entity()
export class Row {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Template, template => template.rows)
    template: Template
}