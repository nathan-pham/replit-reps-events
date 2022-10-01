import type { NextApiRequest, NextApiResponse } from "next";
import { createServer } from "@graphql-yoga/node";

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
        typeDefs: `
            type Query {
                helloWorld: String
            }
        `,
        resolvers: {
            Query: {
                helloWorld: () => "Hello World",
            },
        },
    },
    endpoint: "/api/graphql",
});
