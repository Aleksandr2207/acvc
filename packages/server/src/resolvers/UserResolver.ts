import { User } from "src/entities/User";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    getAllUsers() {
        return User.find();
    }

    @Mutation(() => User)
    createUser(@Arg("name") name: string, @Arg("surname") surname: string) {
        return User.create({ name, surname }).save();
    }
}
