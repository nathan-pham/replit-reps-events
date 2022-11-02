import { Button } from "components/utils/atoms";
import Link from "next/link";

const HeaderPlain = () => {
    return (
        <>
            <img tw="h-9 w-9 object-cover" src="/favicon-prompt.png" />
            <div tw="flex justify-end gap-1.5">
                <Link href="/signup">
                    <Button>Sign up</Button>
                </Link>
                <Link href="/login">
                    <Button variant="hollow">Log in</Button>
                </Link>
            </div>
        </>
    );
};

export default HeaderPlain;
