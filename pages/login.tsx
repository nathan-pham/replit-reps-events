import type { NextPage } from "next";

import { FormEventHandler } from "react";
import { BiPlus } from "react-icons/bi";
import CreateUser from "components/graphql/CreateUser.graphql";
import { useMutation } from "urql";

import PageRoot from "components/PageRoot";
import { Button, Input } from "components/utils/atoms";

const Login: NextPage = () => {
    const [createUserResult, createUser] = useMutation(CreateUser);
    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        // submit form
        const user = new FormData(e.target as HTMLFormElement);
        createUser({
            username: user.get("username"),
            email: user.get("email"),
            password: user.get("password"),
        });
    };

    console.log(createUserResult);

    return (
        <PageRoot>
            <div tw="h-screen w-screen grid place-items-center">
                <form tw="flex flex-col w-80 p-4" onSubmit={onSubmit}>
                    <img src="/favicon-196.png" tw="w-8 h-8 rounded-md mb-1" />
                    <h1 tw="text-2xl font-semibold">Create an account</h1>
                    <Input
                        tw="mt-4"
                        placeholder="Username"
                        name="username"
                        type="text"
                        required
                    />
                    <Input
                        tw="mt-2"
                        placeholder="Email"
                        name="email"
                        type="email"
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
                        <BiPlus />
                        Create account
                    </Button>

                    <p tw="text-sm mt-6">
                        Have an account? <a>Log in</a>
                    </p>
                    <hr tw="mt-2" />
                </form>
            </div>
        </PageRoot>
    );
};

export default Login;
