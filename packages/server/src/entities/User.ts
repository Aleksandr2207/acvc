import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@Entity()
@ObjectType()
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
}
