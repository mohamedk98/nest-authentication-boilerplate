import { Exclude } from "class-transformer"
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Authentication {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string
    
    @Exclude()
    @Column()
    password: string

    @Column()
    userType:string
}