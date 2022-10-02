import type { AppProps } from "next/app";
import { GlobalStyles } from "twin.macro";
import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <GlobalStyles />
        <Component {...pageProps} />
    </>
);

export default App;
