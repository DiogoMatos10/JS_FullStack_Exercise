import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Security } from './Security'; 

@Entity('prices') 
export class Price {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Security, security => security.prices)
    security!: Security; 

    @Column({ type: 'date' })
    date!: Date; 

    @Column({ type: 'float' })
    close!: number; 

    @Column({ type: 'bigint' }) 
    volume!: number; 
}
