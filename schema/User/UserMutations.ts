import { Resolvers, User } from "schema";
import UserModel from "./UserModel";

export const UserMutations: Resolvers["Mutation"] = {
    loginUser: async (_, { username, password }) => {
        return UserModel.loginUser(username, password);
    },
    createUser: async (_, { username, password, email }) => {
        return UserModel.createUser(username, password, email, "");
    },
};
