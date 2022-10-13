import { GraphQLYogaError } from "@graphql-yoga/node";
import bcrypt from "bcryptjs";

import { User } from "schema";
import supabase, { USER_TABLE } from "schema/supabase";
import generateToken from "utils/generateToken";

// another solution for destructuring in class props proposed here
// https://github.com/Microsoft/TypeScript/issues/5326

class UserModel {
    /**
     * Create a user given a username, password, email, and avatar
     * @param username
     * @param password
     * @param email
     * @param avatar - URL pointing to the user's avatar, defaults to blank
     * @returns User or Error (if user is already in the database)
     */
    static async createUser(
        username: string,
        password: string,
        email: string,
        avatar = ""
    ) {
        // check if user already exists
        const existingUser = await UserModel.findByUsername(username).catch(
            () => {}
        );

        if (existingUser instanceof UserModel) {
            return Promise.reject(new GraphQLYogaError("User already exists"));
        }

        const { data } = await supabase.from(USER_TABLE).insert({
            username,
            password: await bcrypt.hash(password, 12),
            email,
            avatar,
        });

        // return user with jwt token
        if (data && Array.isArray(data) && data.length > 0) {
            const user = data[0] as User;
            user.token = generateToken(user);
            return user;
        }

        return Promise.reject(new GraphQLYogaError("Failed to create user"));
    }

    /**
     * Find a user in the database & convert it to a UserModel
     * @param username - Username of the user to find
     * @returns User or Error (if user is not found)
     */
    static async findByUsername(username: string) {
        const { data } = await supabase
            .from(USER_TABLE)
            .select()
            .eq("username", username);

        // return user, if found
        if (data && Array.isArray(data) && data.length > 0) {
            return data[0] as User;
        }

        return Promise.reject(new GraphQLYogaError("User not found"));
    }
}

export default UserModel;
