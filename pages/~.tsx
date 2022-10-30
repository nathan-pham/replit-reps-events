import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import PageRoot from "components/PageRoot";
import Header from "components/Header";
import PageWrapper from "components/PageWrapper";
import { validateToken } from "utils/manageToken";
import Cookies from "cookies";
import UserModel from "schema/User/UserModel";
import { Button } from "components/utils/atoms";

const Dashboard: NextPage = ({
    user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <PageRoot>
            <PageWrapper>
                <Header username={user.username} avatar={user.avatar} />
                {/* <h1>Registered For</h1> */}
                <h1 tw="font-bold text-2xl">My Events</h1>
                <Button tw="mt-1">Create Event</Button>

                <pre>{JSON.stringify(user, null, 2)}</pre>
            </PageWrapper>
        </PageRoot>
    );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const userToken = validateToken(new Cookies(req, res).get("token")!);

    // https://stackoverflow.com/questions/2839585/what-is-correct-http-status-code-when-redirecting-to-a-login-page
    if (!userToken) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    let user;
    try {
        user = UserModel.removePrivateFields(
            await UserModel.findByUsername(userToken.username)
        );
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
            user,
        },
    };
};
