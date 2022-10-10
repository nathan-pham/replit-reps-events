import { Resolvers, User } from "schema";

export const UserQueries: Resolvers["Query"] = {
    user: (_, { username }) => {
        return { username } as User;
    },
};
