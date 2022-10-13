import { createClient } from "urql";

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : "";
};

const client = createClient({
    url: "/api/graphql",
    fetchOptions: () => {
        const token = getToken();
        return {
            headers: {
                Authorization: token,
            },
        };
    },
});

export default client;
