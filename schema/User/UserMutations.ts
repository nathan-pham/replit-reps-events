import { Resolvers } from "schema";
import UserModel from "./UserModel";

export const UserMutations: Resolvers["Mutation"] = {
    loginUser: async (_, { username, password }, { cookies }) => {
        const user = await UserModel.loginUser(username, password);
        cookies.set("token", user.token, { signed: true });
        return user;
    },
    createUser: async (_, { username, password, email }, { cookies }) => {
        const user = await UserModel.createUser(username, password, email, "");
        cookies.set("token", user.token, { signed: true });
        return user;
    },
};
