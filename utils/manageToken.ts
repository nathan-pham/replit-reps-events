import jwt from "jsonwebtoken";
import { User } from "schema";

export const generateToken = ({ id, username, email }: User) =>
    jwt.sign(
        {
            id,
            username,
            email,
        },
        `${process.env.JWT_SECRET}`,
        {
            expiresIn: "1d",
        }
    );

export const validateToken = (authHeader: string) => {
    if (!authHeader) {
        return false;
    }

    const token = authHeader.replace("Bearer ", "").trim();
    try {
        const user = jwt.verify(token, `${process.env.JWT_SECRET}`);
        return user as User;
    } catch (e) {
        return false;
    }
};
