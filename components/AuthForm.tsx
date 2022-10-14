import { FormEventHandler, ReactNode } from "react";

interface AuthFormProps {
    title: string;
    children: ReactNode;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

const AuthForm = ({ title, children, onSubmit }: AuthFormProps) => {
    return (
        <div tw="h-screen w-screen grid place-items-center">
            <div tw="w-80 p-4">
                <img src="/logo.svg" tw="w-8 h-8 rounded-md mb-1" />
                <form tw="flex flex-col w-full" onSubmit={onSubmit}>
                    <h1 tw="text-2xl font-semibold">{title}</h1>
                    {children}
                </form>

                {/* Continue with Auth Providers */}
            </div>
        </div>
    );
};

{
    /* <form >
    <h1 tw="text-2xl font-semibold">Login to your account</h1>
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
</form>; */
}

export default AuthForm;
