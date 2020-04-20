import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany, ManyToMany, JoinTable
} from 'typeorm';
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
            row => row.template
        )
    rows: Row[];

    @OneToMany(
        type => Col,
        column => column.template,
        {
            eager:true,
            cascade: true
        }
    )
    columns: Col[];

    @OneToMany(
        type => Cell,
        cell => cell.template
    )
    cells: Cell[];
}