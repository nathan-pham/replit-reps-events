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
                <h1 tw="text-4xl font-extrabold mt-4">
                    Event Template Hackathon
                </h1>
                <p tw="text-gray-700 mt-2">Code your way to the top!</p>
                <p tw="text-gray-700 mt-2">
                    Join us for our first ever Tutorial Jam, where we challenge
                    you to teach something amazing in a single Repl using our
                    brand new Tutorial feature! You don't need to be a teacher.
                </p>
                <p tw="text-gray-700 mt-2">
                    Everyone can teach. In fact you may have some new,
                    interesting way of showing us how to do something that a
                    traditional teacher may not have thought to do.
                </p>
                <button tw="flex items-center rounded-md border border-transparent px-2 py-1 bg-blue-300 text-sm gap-1 hover:(border-blue-400) mt-4">
                    <BiClipboard /> Register
                </button>
                <h2 tw="text-3xl font-bold mt-4">Tasks</h2>
                <div></div>
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
