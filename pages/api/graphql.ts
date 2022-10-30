import type { NextApiRequest, NextApiResponse } from "next";
import { createServer } from "@graphql-yoga/node";
import Cookies from "cookies";

import {
    typeDefs as scalarTypeDefs,
    resolvers as scalarResolvers,
} from "graphql-scalars";

import { UserTypes, UserQueries, UserMutations } from "schema/User";
import { EventTypes, EventQueries, EventMutations } from "schema/Event";

// let yoga handle request
export const config = {
    api: {
        bodyParser: false,
    },
};

// create yoga Server
export default createServer<{
    req: NextApiRequest;
    res: NextApiResponse;
}>({
    schema: {
        typeDefs: [
            ...scalarTypeDefs,
            `
                type Query
                type Mutation
            `,
            UserTypes,
            EventTypes,
        ],
        resolvers: {
            ...scalarResolvers,
            Query: {
                ...UserQueries,
                ...EventQueries,
            },
            Mutation: {
                ...UserMutations,
                ...EventMutations,
            },
        },
    },
    endpoint: "/api/graphql",
    context: (ctx) => {
        const cookies = new Cookies(ctx.req, ctx.res, [
            `${process.env.COOKIE_SECRET}`,
        ]);

        return {
            cookies,
            token: ctx.req.headers.authorization || cookies.get("token"),
        };
    },
});
