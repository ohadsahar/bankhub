import {MainEntity} from "../api/models/main.abstract";
import {Column, Entity, ManyToOne, OneToOne} from "typeorm";
import {User} from "./user.entity";
import {Transaction} from "./transaction.entity";

@Entity()
export class Category extends MainEntity {

    @Column()
    categoryName: string;

    @ManyToOne(type => User, user => user.category)
    user: User | User['id']

    @OneToOne(type => Transaction, transaction => transaction.category)
    transaction: Transaction | Transaction['id']

}