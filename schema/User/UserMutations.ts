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
    addUserRole: async (_, { role }, { token }) => {
        const userPartial = await UserModel.validateUser(token);
        return UserModel.updateUser(userPartial.username, (user) => {
            if (user.roles.includes(role)) {
                return null;
            }

            return {
                roles: [...(user.roles || []), role],
            };
        });
    },
    removeUserRole: async (_, { role }, { token }) => {
        const userPartial = await UserModel.validateUser(token);
        return UserModel.updateUser(userPartial.username, (user) => {
            return {
                roles: (user.roles || []).filter((r) => r !== role),
            };
        });
    },
};

// addUserRole(username: String!, role: UserRoles!): User!
// removeUserRole(username: String!, role: UserRoles!): User!
