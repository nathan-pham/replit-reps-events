import { ReactNode } from "react";
import NextHead from "next/head";

interface PageRootProps {
    title?: string;
    description?: string;
    children: ReactNode;
}

const PageRoot = ({ title, description, children }: PageRootProps) => {
    title = title ? `${title} - Replit Reps` : "Replit Reps";

    return (
        <>
            <NextHead>
                <link
                    rel="shortcut icon"
                    href="/favicon-prompt.png"
                    sizes="196x196"
                    type="image/png"
                />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </NextHead>
            {children}
        </>
    );
};

export default PageRoot;
