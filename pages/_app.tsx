import type { AppProps } from "next/app";
import { GlobalStyles } from "twin.macro";
import "tailwindcss/tailwind.css";

import { Provider } from "urql";
import client from "components/graphql/client";

const App = ({ Component, pageProps }: AppProps) => (
    <Provider value={client}>
        <GlobalStyles />
        <Component {...pageProps} />
    </Provider>
);

export default App;
