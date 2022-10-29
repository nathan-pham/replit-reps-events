import type { NextPage } from "next";

import { BiRightArrowAlt } from "react-icons/bi";

import PageRoot from "components/PageRoot";
import AuthForm from "components/AuthForm";
import { Button, Input } from "components/utils/atoms";

const Login: NextPage = () => {
    return (
        <PageRoot>
            <AuthForm title="Login to your account" onSubmit={(e) => {}}>
                <Input
                    tw="mt-4"
                    placeholder="Email or Username"
                    name="username"
                    type="text"
                    required
                />
                <Input
                    tw="mt-2"
                    placeholder="Password"
                    name="password"
                    type="password"
                    required
                />

                <Button tw="mt-2">
                    Login
                    <BiRightArrowAlt />
                </Button>
            </AuthForm>
        </PageRoot>
    );
};

export default Login;
