import type { NextPage } from "next";

import { FormEventHandler } from "react";
import { BiPlus } from "react-icons/bi";
import CreateUser from "components/graphql/CreateUser.graphql";
import { useMutation } from "urql";

import PageRoot from "components/PageRoot";
import { Button, Input } from "components/utils/atoms";
import AuthForm from "components/AuthForm";
import { useRouter } from "next/router";

const Login: NextPage = () => {
    const router = useRouter();
    const [createUserResult, createUser] = useMutation(CreateUser);
    const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        // submit form
        const user = new FormData(e.target as HTMLFormElement);
        const result = await createUser({
            username: user.get("username"),
            email: user.get("email"),
            password: user.get("password"),
        });

        if (result.error) {
        } else {
            router.push("/~");
        }
    };

    // useEffect(() => {
    //     // console.log(createUserResult);
    // }, [createUserResult]);

    return (
        <PageRoot>
            <AuthForm title="Create an account" onSubmit={onSubmit}>
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
            </AuthForm>

            {/* <p tw="text-sm mt-6">
                        Have an account? <a>Log in</a>
                    </p>
                    <hr tw="mt-2" /> */}
        </PageRoot>
    );
};

export default Login;
