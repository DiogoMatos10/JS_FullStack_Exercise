// src/graphql/models/Security.ts
import { ObjectType, Field, Int } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Price } from './Price';

@ObjectType()
@Entity('securities')
export class Security {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ length: 20 })
    ticker!: string;

    @Field()
    @Column({ name: 'security_name', length: 100 })
    securityName!: string;

    @Field()
    @Column({ length: 100 })
    sector!: string;

    @Field()
    @Column({ length: 100 })
    country!: string;

    @Field()
    @Column('float')
    trend!: number;

    @Field(() => [Price])
    @OneToMany(() => Price, price => price.security)
    prices!:Price[];
}