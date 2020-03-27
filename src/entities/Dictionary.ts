import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Row} from "./Row";
import {DictionaryValue} from "./DictionaryValue";


@Entity()
export class Dictionary {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        type => DictionaryValue,
        row => row.dictionary,
        {eager:true}
    )
    values: DictionaryValue[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: string;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: string;
}