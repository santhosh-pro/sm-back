import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Row} from "./Row";

@Entity()
export class Template {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => Row,row => row.template)
    rows: Row[]
}