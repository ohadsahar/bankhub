import {Column, Entity, OneToOne} from "typeorm";
import {MainEntity} from "../api/models/main.abstract";
import {User} from './user.entity';
import {Business} from "./business.entity";

@Entity()
export class FileModel extends MainEntity {

    @Column()
    filePath: string;

    @Column()
    fileName: string;

    @Column()
    uploaderId: number;

    @OneToOne(type => User, user => user.profilePicture)
    user: User | User['id']

    @OneToOne(type => Business, business => business.businessLogo)
    business: Business | Business['id']
}