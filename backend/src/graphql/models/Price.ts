import { ObjectType, Field, Int, Float } from 'type-graphql';
import { DateTimeResolver } from 'graphql-scalars';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Security } from './Security';

@ObjectType()
@Entity('prices')
export class Price {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Security)
    @ManyToOne(() => Security, security => security.prices)
    @JoinColumn({ name: 'security_id' })
    security!: Security;

    @Field(() => DateTimeResolver)
    @Column({ type: 'timestamptz' }) 
    date!: Date;

    @Field(() => Float, { nullable: true })
    @Column({ type: 'float', nullable: true })
    close!: number;

    @Field(() => Int, { nullable: true })
    @Column({ type: 'bigint', nullable: true })
    volume?: number;
}