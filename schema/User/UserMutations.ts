import { Resolvers, User } from "schema";

export const UserMutations: Resolvers["Mutation"] = {
    loginUser: async (_, { username, password }) => {
        return { username, password } as User;
    },
    createUser: async (_, { username, password, email }) => {
        return { username, password, email } as User;
    },
};
