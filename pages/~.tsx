import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import type { Event } from "schema";

import PageRoot from "components/PageRoot";
import Header from "components/Header";
import PageWrapper from "components/PageWrapper";
import { validateToken } from "utils/manageToken";
import Cookies from "cookies";
import UserModel from "schema/User/UserModel";
import { Button } from "components/utils/atoms";
import EventModel from "schema/Event/EventModel";
import EventChip from "components/EventChip";
import { BiPlanet, BiPlus } from "react-icons/bi";

const Dashboard: NextPage = ({
    user,
    events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <PageRoot>
            <PageWrapper>
                <Header username={user.username} avatar={user.avatar} />
                {/* <h1>Registered For</h1> */}
                <h1 tw="font-bold text-2xl">My Events</h1>
                <div tw="mt-5 flex gap-3">
                    <Button>
                        <BiPlus />
                        Create Event
                    </Button>
                    <Button variant="hollow">
                        <BiPlanet />
                        Explore Events
                    </Button>
                </div>
                <div tw="grid grid-cols-3 gap-3 mt-3">
                    {events.map((event: Event) => (
                        <EventChip key={event.id} {...event} />
                    ))}
                </div>

                <pre>{JSON.stringify(user, null, 2)}</pre>
                <pre>{JSON.stringify(events, null, 2)}</pre>
            </PageWrapper>
        </PageRoot>
    );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    let user;
    let events = [];

    try {
        const userToken = validateToken(new Cookies(req, res).get("token")!);
        if (!userToken) {
            throw new Error("Invalid token");
        }

        user = await UserModel.findByUsername(userToken.username);
        events = (
            await Promise.all(
                (user.events as unknown as string[]).map((id) =>
                    EventModel.findEventById(id).catch((e) => null)
                )
            )
        ).filter((event) => event); // get all events that actually exist;

        console.log(events);
    } catch (e) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: UserModel.removePrivateFields(user),
            events,
        },
    };
};
