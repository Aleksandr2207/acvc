import { User } from 'src/entities/User';
import { Resolver, Query, Mutation, Arg, ObjectType, Field, emitSchemaDefinitionFile } from 'type-graphql';
import argon2 from 'argon2';
import { userInfo } from 'os';

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).+$/;

@ObjectType()
class ErrorConfig {
    @Field()
    typeOfErr: string;
    @Field()
    nameOfErr: string;
}
@ObjectType()
class UserEntry {
    @Field(
        function getType() {
            return [String];
        },
        { nullable: true }
    )
    errors: string[] | null;
    @Field({ nullable: true })
    pointOfEntry: boolean;
}
@ObjectType()
class UserResponse {
    @Field(() => [ErrorConfig], { nullable: true })
    errors: ErrorConfig[] | null;
    @Field(() => User, { nullable: true })
    data: User | null;
}
@Resolver()
export class UserResolver {
    @Query(() => [User])
    getAllUsers() {
        return User.find();
    }

    @Mutation(() => User)
    createUser(@Arg('name') name: string, @Arg('surname') surname: string) {
        return User.create({ name, surname }).save();
    }
    @Mutation(() => UserResponse)
    async register(
        @Arg('name') name: string,
        @Arg('surname') surname: string,
        @Arg('password') password: string,
        @Arg('email') email: string
    ): Promise<UserResponse> {
        const errors: ErrorConfig[] = [];
        errors.push({ nameOfErr: '', typeOfErr: '' });
        if (!email.includes('@')) {
            errors.push('Not valid email');
        }
        if (email.length < 6) {
            errors.push('Not valid email');
        }
        if (name.length < 6) {
            errors.push('Name is too short');
        }
        if (surname.length < 6) {
            errors.push('Surname is too short');
        }
        if (password.length < 6) {
            errors.push('Password is too short');
        }
        if (!password.match(PASSWORD_REGEX)) {
            errors.push('Passwod should contain at least one capital letter, one small letter and one number.');
        }
        if (errors.length === 0) {
            const hash = await argon2.hash(password);
            let user = await User.create({ name, surname, password: hash, email }).save();
            return { data: user, errors: null };
        } else {
            return { data: null, errors };
        }
    }

    // @Mutation(() => UserResponse)
    // async resetPassword(@Arg('email') email: string, @Arg('password') password: string) {
    //     const user = await User.findOne({ where: { email } });
    //     if (user && password.length > 5) {
    //         user.password = password;
    //         return { data: user, error: null };
    //     }
    // }

    @Query(() => UserEntry)
    async logIn(@Arg('email') email: string, @Arg('password') password: string): Promise<UserEntry> {
        const errors: string[] = [];
        const user = await User.findOne({ where: { email } });

        if (!user) {
            errors.push('Email is wrong');
        } else if (!argon2.verify(user.password, password)) {
            errors.push('Password is incorrect');
        }

        if (errors.length === 0) {
            return { pointOfEntry: true, errors: null };
        } else {
            return { pointOfEntry: false, errors };
        }
    }
}
