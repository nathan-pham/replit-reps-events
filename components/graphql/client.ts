import { createClient } from "urql";

const client = createClient({
    url: "/api/graphql",
    // stopped using fetchOptions w/ localStorage token in favor of server-side cookies
});

export default client;
