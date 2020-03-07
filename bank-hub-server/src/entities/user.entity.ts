import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { FileEntity } from './file.entity';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userToken: string;

    @Column()
    phoneNumber: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @OneToOne(() => FileEntity, file => file.uploader, { eager: true })
    @JoinColumn()
    file: FileEntity;
}