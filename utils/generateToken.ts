import jwt from "jsonwebtoken";
import { User } from "schema";

const generateToken = ({ id, username, email }: User) =>
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

export default generateToken;
