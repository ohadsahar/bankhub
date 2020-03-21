import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {MainEntity} from "../api/models/main.abstract";
import {User} from "./user.entity";
import {Transaction} from "./transaction.entity";
import {BankAccount} from "./bank-account.entity";

@Entity()
export class Card extends MainEntity {

    @Column()
    cardName: string;

    @Column()
    cardNumber: string;

    @Column()
    cardBudget: number;

    @Column()
    cardLogo: string;

    @ManyToOne(type => User, user => user.cards)
    user: User | User['id']

    @OneToMany(type => Transaction, transaction => transaction.card)
    @JoinColumn()
    transactions: Transaction[];

    @OneToOne(type => BankAccount, bankAccount => bankAccount.card, {cascade: true})
    @JoinColumn()
    bankAccount: BankAccount | BankAccount['id']

}