import {Column, Entity, OneToOne} from "typeorm";
import {User} from './user.entity';
import {MainEntity} from "../api/models/main.abstract";


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

}