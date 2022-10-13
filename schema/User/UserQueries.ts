import { Resolvers } from "schema";
import UserModel from "./UserModel";

export const UserQueries: Resolvers["Query"] = {
    user: async (_, { username }) => {
        const user = await UserModel.findByUsername(username);
        // remove private fields
        user.password = "";
        user.email = "";

        return user;
    },
};
