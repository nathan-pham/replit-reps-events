import type { AppProps } from "next/app";
import { GlobalStyles } from "twin.macro";
import "tailwindcss/tailwind.css";

import { Provider } from "urql";
import client from "components/graphql/client";
import Toasts from "components/Toasts";
import ModalEvent from "components/ModalEvent";

import { useUser } from "hooks/useUserStore";
import { User } from "schema";

const App = ({ Component, pageProps }: AppProps<{ user: User | null }>) => {
    // set user if it exists
    if ("user" in pageProps && pageProps.user) {
        useUser(pageProps.user);
    }

    return (
        <Provider value={client}>
            <GlobalStyles />
            <Component {...pageProps} />
            <ModalEvent />
            <Toasts />
        </Provider>
    );
};

export default App;
