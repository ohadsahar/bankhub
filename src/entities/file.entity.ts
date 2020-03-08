import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { UserEntity } from './user.entity';


@Entity()
export class FileEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filePath: string;

    @Column()
    fileName: string;

    @OneToOne(() => UserEntity, user => user.file, { onDelete: 'CASCADE' })
    uploader: UserEntity;

}