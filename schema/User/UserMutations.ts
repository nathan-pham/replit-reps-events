import { Resolvers, User } from "schema";
import UserModel from "./UserModel";

export const UserMutations: Resolvers["Mutation"] = {
    loginUser: async (_, { username, password }) => {
        return { username, password } as User;
    },
    createUser: async (_, { username, password, email }) => {
        return UserModel.createUser(username, password, email, "");
    },
};
