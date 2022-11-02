import { Button } from "components/utils/atoms";

const HeaderPlain = () => {
    return (
        <>
            <img tw="h-8 w-8 object-cover" src="/favicon-prompt.png" />
            <div tw="flex justify-end gap-1.5">
                <Button>Sign up</Button>
                <Button variant="hollow">Log in</Button>
            </div>
        </>
    );
};

export default HeaderPlain;
