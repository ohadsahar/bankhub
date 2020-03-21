import {Column, Entity, JoinColumn, OneToMany, OneToOne} from "typeorm";
import {FileModel} from './file.entity';
import {MainEntity} from "../api/models/main.abstract";
import {Card} from "./card.entity";
import {Category} from "./category.entity";

@Entity()
export class User extends MainEntity {

    @Column({nullable: true})
    fullName: string;

    @Column()
    phoneNumber: string;

    @OneToOne(type => FileModel, file => file.user, {cascade: true})
    @JoinColumn()
    profilePicture: FileModel;

    @OneToMany(type => Card, card => card.user)
    @JoinColumn()
    cards: Card[]

    @OneToMany(type => Category, category => category.user)
    @JoinColumn()
    category: Category[];
}