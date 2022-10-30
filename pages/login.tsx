import type { NextPage } from "next";

import { FormEventHandler } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { useRouter } from "next/router";

import PageRoot from "components/PageRoot";
import AuthForm from "components/AuthForm";
import { Button, Input } from "components/utils/atoms";

import LoginUser from "components/graphql/LoginUser.graphql";
import { useMutation } from "urql";
import useToastStore from "hooks/useToastStore";

const Login: NextPage = () => {
    const router = useRouter();
    const [_, loginUser] = useMutation(LoginUser);
    const addToast = useToastStore((s) => s.addToast);
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const user = new FormData(e.target as HTMLFormElement);
        const result = await loginUser({
            username: user.get("username"),
            password: user.get("password"),
        });

        if (result.error) {
            return addToast(
                "Try that again.",
                "Looks like you have the wrong password."
            );
        }

        // redirect to dashboard
        router.push("/~");
    };

    return (
        <PageRoot>
            <AuthForm title="Login to your account" onSubmit={onSubmit}>
                <Input
                    tw="mt-4"
                    placeholder="Username"
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
