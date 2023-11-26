import { Reports } from './../reports/reports.entitiy';
import { Exclude } from 'class-transformer';
import {
    AfterInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    // @Exclude() // * One way to restrict the value
    password: string;

    @OneToMany(() => Reports, (report) => report.user)
    reports: Reports[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @AfterInsert()
    afterMethodExe() {
        console.log('Modified', this.id);
    }
}
