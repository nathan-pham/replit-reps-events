import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";

import PageRoot from "components/PageRoot";
import Header from "components/Header";
import PageWrapper from "components/PageWrapper";
import UserModel from "schema/User/UserModel";
import { Button } from "components/utils/atoms";
import { BiPlanet, BiPlus } from "react-icons/bi";
import useEventStore from "hooks/useEventStore";
import { serverGetUser, serverGetUserEvents } from "utils/serverGetProfile";
import DashboardSection from "components/DashboardSection";
import EventChips from "components/EventChips";

const Dashboard: NextPage = ({
    user,
    events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const setModalOpen = useEventStore((s) => s.setModalOpen);

    return (
        <PageRoot>
            <PageWrapper>
                <Header user={user} />
                <DashboardSection title="Registered Events">
                    <Button variant="hollow">
                        <BiPlanet />
                        Explore Events
                    </Button>
                </DashboardSection>
                <DashboardSection title="My Events">
                    <Button onClick={() => setModalOpen(true)} tw="mt-4">
                        <BiPlus />
                        Create Event
                    </Button>
                    <EventChips events={events} />
                </DashboardSection>

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
        user = await serverGetUser(req, res);
        events = await serverGetUserEvents(user.events);
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
