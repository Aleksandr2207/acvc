import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ObjectType, Field, Int, FieldResolver } from 'type-graphql';

@Entity()
@ObjectType()
@Unique(['email'])
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @CreateDateColumn()
    creationDate!: Date;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    surname!: string;

    @Field()
    @Column()
    password!: string;

    @Field()
    @Column()
    email!: string;
    static password: string;
}
