import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Dictionary} from "./Dictionary";
import {DictionaryValue} from "./DictionaryValue";


@Entity()
export class DictionaryType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    isDefault: boolean;

    @ManyToOne(
        type => Dictionary,
        col => col.types
    )
    dictionary: Dictionary;

    @OneToMany(
        type => DictionaryValue,
        row => row.type,
        {eager:true}
    )
    values: DictionaryValue[];
}