import { Resolvers } from "schema";
import UserModel from "./UserModel";

export const UserQueries: Resolvers["Query"] = {
    user: async (_, { username }) => {
        return UserModel.removePrivateFields(
            await UserModel.findByUsername(username)
        );
    },
};
