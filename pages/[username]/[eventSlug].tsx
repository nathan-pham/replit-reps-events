import type {
    NextPage,
    GetServerSideProps,
    InferGetServerSidePropsType,
} from "next";
import { BiClipboard } from "react-icons/bi";

import Header from "components/Header";
import PageRoot from "components/PageRoot";
import PageWrapper from "components/PageWrapper";
import { serverGetUser } from "utils/serverGetProfile";
import UserModel from "schema/User/UserModel";
import EventModel from "schema/Event/EventModel";
import { separateSlug } from "utils/manageSlug";

const Event: NextPage = ({
    user,
    event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <PageRoot>
            <PageWrapper>
                <Header user={user} />
                <img
                    src="/defaultEvent.jpg"
                    tw="w-full h-72 rounded-lg object-cover object-top"
                />
                <h1 tw="text-4xl font-extrabold mt-4">{event.title}</h1>
                <p tw="text-gray-700 mt-2">{event.description}</p>
                {/* <Button>
                    <BiClipboard /> Register
                </Button> */}

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
                <h2 tw="text-3xl font-bold mt-4">Tasks</h2>
                <div></div>
            </PageWrapper>
        </PageRoot>
    );
};

export default Event;

export const getServerSideProps: GetServerSideProps = async ({
    req,
    res,
    query,
}) => {
    const { eventSlug, eventId } = separateSlug(query.eventSlug as string);
    const ownerUsername = query.username as string;
    let owner, event;

    // no event id
    if (!(eventSlug && eventId)) {
        return {
            notFound: true,
        };
    }

    try {
        owner = await UserModel.findByUsername(ownerUsername);
        event = await EventModel.findEventById(eventId);

        const slug = event.title.split(" ").join("-").toLowerCase();
        if (slug !== eventSlug) {
            throw new Error("Invalid slug");
        }
    } catch (e) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            user: await serverGetUser(req, res).catch(() => null),
            owner,
            event,
        },
    };
};
