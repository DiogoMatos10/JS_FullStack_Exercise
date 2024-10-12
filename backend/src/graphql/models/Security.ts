import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Price } from './Price';

@Entity('securities')
export class Security {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 20 }) 
    ticker!: string;

    @Column({ name: 'security_name', length: 100 }) 
    securityName!: string;

    @Column({ length: 100 }) 
    sector!: string;

    @Column({ length: 100 }) 
    country!: string;

    @Column('float') 
    trend!: number;

    @OneToMany(() => Price, price => price.security) 
    prices!: Price[]; 
}
