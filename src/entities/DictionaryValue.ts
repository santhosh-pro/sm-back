import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Template} from "./Template";
import {Dictionary} from "./Dictionary";


@Entity()
export class DictionaryValue {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isDefault: boolean;

    @Column()
    value: string;

    @Column()
    key: string;

    @ManyToOne(
        type => Dictionary,
        col => col.values
    )
    dictionary: Dictionary;

    @CreateDateColumn({type: "timestamp"})
    createdAt: string;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: string;
}