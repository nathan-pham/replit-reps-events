import type { NextPage } from "next";
import PageRoot from "components/PageRoot";
import { Button, Input } from "components/utils/atoms";
import { BiPlus } from "react-icons/bi";

const Home: NextPage = () => {
    return (
        <PageRoot>
            <div tw="h-screen w-screen grid place-items-center">
                <form tw="flex flex-col max-w-xs p-4">
                    <h1 tw="text-2xl font-semibold">
                        Create an Events account
                    </h1>
                    <Input
                        tw="mt-4"
                        placeholder="Username"
                        name="username"
                        type="text"
                    />
                    <Input
                        tw="mt-2"
                        placeholder="Email"
                        name="email"
                        type="email"
                    />
                    <Input
                        tw="mt-2"
                        placeholder="Password"
                        name="password"
                        type="password"
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

export default Home;
