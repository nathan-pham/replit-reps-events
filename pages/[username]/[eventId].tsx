import type { NextPage, GetServerSideProps } from "next";
import { BiClipboard } from "react-icons/bi";

import Header from "components/Header";
import PageRoot from "components/PageRoot";
import PageWrapper from "components/PageWrapper";

const Event: NextPage = () => {
    return (
        <PageRoot>
            <PageWrapper>
                <Header />
                <img
                    src="https://art.replit.com/images/AI-compBOT2.jpg"
                    tw="w-full h-72 rounded-2xl object-cover object-top"
                />
                <h1 tw="text-5xl font-extrabold mt-4">
                    Event Template Hackathon
                </h1>
                <p tw="text-gray-700 mt-1">Code your way to the top!</p>
                <button tw="flex items-center rounded-md border border-transparent px-2 py-1 bg-blue-300 text-sm gap-1 hover:(border-blue-400) mt-2">
                    <BiClipboard /> Submit Entry
                </button>
            </PageWrapper>
        </PageRoot>
    );
};

export default Event;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { username, eventId } = context.query;

    if (!(username as string)?.startsWith("@")) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            username,
            eventId,
        },
    };
};
