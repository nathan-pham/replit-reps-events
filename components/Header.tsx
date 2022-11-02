import { User } from "schema";
import HeaderAuth from "./HeaderAuth";
import HeaderPlain from "./HeaderPlain";

interface HeaderProps {
    user: User | null;
}

const Header = ({ user }: HeaderProps) => {
    return (
        <header tw="flex items-center justify-between py-3 w-full">
            {user ? (
                <HeaderAuth username={user.username} avatar={user.avatar} />
            ) : (
                <HeaderPlain />
            )}
        </header>
    );
};

export default Header;
