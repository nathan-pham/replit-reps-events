import type { NextPage } from "next";
import PageRoot from "components/PageRoot";
import Header from "components/Header";
import PageWrapper from "components/PageWrapper";

const Dashboard: NextPage = () => {
    return (
        <PageRoot>
            <PageWrapper>
                <Header />
                <h1>My Events</h1>
            </PageWrapper>
        </PageRoot>
    );
};

export default Dashboard;
