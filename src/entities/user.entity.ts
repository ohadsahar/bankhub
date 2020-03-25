import {Column, Entity, JoinColumn, OneToMany, OneToOne} from "typeorm";
import {MainEntity} from "../api/models/main.abstract";
import {Card} from "./card.entity";
import {Category} from "./category.entity";
import {FileModel} from './file.entity';
import {Budget} from "./budget.entity";
import {Settings} from "./settings.entity";

@Entity()
export class User extends MainEntity {

    @Column({nullable: true})
    fullName: string;

    @Column()
    phoneNumber: string;

    @Column({nullable: true})
    firebaseToken: string;

    @OneToOne(type => FileModel, file => file.user, {cascade: true})
    @JoinColumn()
    profilePicture: FileModel;

    @OneToMany(type => Card, card => card.user)
    @JoinColumn()
    cards: Card[]

    @OneToMany(type => Category, category => category.user)
    @JoinColumn()
    category: Category[];

    @OneToMany(type => Budget, budget => budget.user)
    @JoinColumn()
    budget: Budget | Budget['id']

    @OneToOne(type => Settings, settings => settings.user)
    @JoinColumn()
    settings: Settings | Settings['id']
}