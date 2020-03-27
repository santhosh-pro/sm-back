import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {DictionaryType} from "./DictionaryType";


@Entity()
export class DictionaryValue {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;

    @ManyToOne(
        type => DictionaryType,
        col => col.values
    )
    type: DictionaryType;

    @CreateDateColumn({type: "timestamp"})
    createdAt: string;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: string;
}