import {Column, Entity, OneToOne} from "typeorm";
import {NotificationTimeEnum} from "../api/models/types.enum";
import {User} from "./user.entity";
import {MainEntity} from "../api/models/main.abstract";

@Entity()
export class Settings extends MainEntity {

    @Column()
    notificationTime: NotificationTimeEnum;

    @Column()
    notificationHour: number;

    @Column()
    notificationMin: number;

    @OneToOne(type => User, user => user.settings, {cascade: true})
    user: User | User['id'];
}