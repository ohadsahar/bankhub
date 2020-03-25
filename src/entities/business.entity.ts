import {Column, Entity, JoinColumn, OneToMany, OneToOne} from "typeorm";
import {Transaction} from "./transaction.entity";
import {MainEntity} from "../api/models/main.abstract";
import {FileModel} from "./file.entity";

@Entity()
export class Business extends MainEntity {
    @Column()
    businessName: string;

    @OneToMany(type => Transaction, transaction => transaction.business)
    transaction: Transaction[]

    @OneToOne(type => FileModel, file => file.business, {cascade: true})
    @JoinColumn()
    businessLogo: FileModel;
}