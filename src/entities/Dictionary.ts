import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {DictionaryType} from "./DictionaryType";


@Entity()
export class Dictionary {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        type => DictionaryType,
        row => row.dictionary,
        {eager:true}
    )
    types: DictionaryType[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: string;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: string;
}