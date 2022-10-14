import type { NextPage } from "next";

import { FormEventHandler } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import CreateUser from "components/graphql/CreateUser.graphql";
import { useMutation } from "urql";

import PageRoot from "components/PageRoot";
import { Button, Input } from "components/utils/atoms";
import AuthForm from "components/AuthForm";

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
