import type { NextApiRequest, NextApiResponse } from "next";
import { createServer } from "@graphql-yoga/node";

import {
    typeDefs as scalarTypeDefs,
    resolvers as scalarResolvers,
} from "graphql-scalars";

import { UserTypes, UserQueries, UserMutations } from "schema/User";
import { EventTypes, EventQueries, EventMutations } from "schema/Event";

// let Apollo handle request
export const config = {
    api: {
        bodyParser: false,
    },
};

// create Apollo Server
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
});
