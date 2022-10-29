import type { NextPage } from "next";

import { FormEventHandler } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { useRouter } from "next/router";

import PageRoot from "components/PageRoot";
import AuthForm from "components/AuthForm";
import { Button, Input } from "components/utils/atoms";

import LoginUser from "components/graphql/LoginUser.graphql";
import { useMutation } from "urql";
import useStore from "hooks/useStore";

const Login: NextPage = () => {
    const router = useRouter();
    const [_, loginUser] = useMutation(LoginUser);
    const addToast = useStore((s) => s.addToast);
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

        // save token & redirect to dashboard
        localStorage.setItem("token", result.data.loginUser.token);
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
