import { GraphQLYogaError } from "@graphql-yoga/node";
import bcrypt from "bcryptjs";

import { User } from "schema";
import supabase, { USER_TABLE } from "schema/supabase";
import { generateToken, validateToken } from "utils/manageToken";
import isValidData from "utils/isValidData";

// another solution for destructuring in class props proposed here
// https://github.com/Microsoft/TypeScript/issues/5326

class UserModel {
    /**
     * Remove private fields from a user
     * @param user - User object
     * @returns
     */
    static removePrivateFields(user: User) {
        user.password = "";
        user.email = "";

        return user;
    }

    /**
     * Get a use from the saved token
     * @param authHeader - Authorization header in request
     * @returns User or Error (if user is not authenticated)
     */
    static async validateUser(authHeader: string) {
        const user = validateToken(authHeader);
        return (
            user ||
            Promise.reject(new GraphQLYogaError("User not authenticated"))
        );
    }

    /**
     * Log in the user
     * @param username - Username of the user
     * @param password - Password of the user
     * @returns User or Error (if user is not able to log in)
     */
    static async loginUser(username: string, password: string) {
        // check if user already exists
        const user = await UserModel.findByUsername(username).catch(() => ({}));
        if (!("username" in user)) {
            return Promise.reject(new GraphQLYogaError("User not found"));
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return Promise.reject(new GraphQLYogaError("Incorrect password"));
        }

        user.token = generateToken(user);
        return user;
    }

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
        // check if user already exists (will have a username)
        const existingUser = await UserModel.findByUsername(username).catch(
            () => ({})
        );
        if ("username" in existingUser) {
            return Promise.reject(new GraphQLYogaError("User already exists"));
        }

        const { data } = await supabase.from(USER_TABLE).insert({
            username,
            password: await bcrypt.hash(password, 12),
            email,
            avatar,
            roles: [],
        });

        // return user with jwt token
        if (isValidData(data)) {
            const user = data![0] as User;
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
        if (isValidData(data)) {
            return data![0] as User;
        }

        return Promise.reject(new GraphQLYogaError("User not found"));
    }

    static async updateUser(
        username: string,
        fieldsCb: (user: User) => Record<string, any> | null
    ) {
        const user = await UserModel.findByUsername(username);
        const newFields = fieldsCb(user);

        if (newFields) {
            const { data } = await supabase
                .from(USER_TABLE)
                .update(newFields)
                .eq("username", username);

            if (isValidData(data)) {
                return data![0] as User;
            }
            return Promise.reject(
                new GraphQLYogaError("Could not update user")
            );
        }

        return user;
    }
}

export default UserModel;
