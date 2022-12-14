import Popup from "components/Popup";
import PopupLink from "components/PopupLink";
import useEventStore from "hooks/useEventStore";
import { useRef } from "react";
import { BiPlus, BiChevronDown, BiUser } from "react-icons/bi";
import { ClickableIcon } from "components/utils/styles";
import { BiBell } from "react-icons/bi";

interface HeaderAuthProps {
    username: string;
    avatar: string;
}

const HeaderAuth = ({ username, avatar }: HeaderAuthProps) => {
    const setModalOpen = useEventStore((s) => s.setModalOpen);
    const handleRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div tw="flex items-center">
                <div tw="flex items-center mr-5">
                    <div tw="h-9 w-9 rounded-full border mr-2 overflow-hidden cursor-pointer">
                        {avatar ? (
                            <img src={avatar} tw="w-full h-full object-cover" />
                        ) : (
                            <div tw="w-full h-full grid place-items-center bg-gray-100">
                                <BiUser />
                            </div>
                        )}
                    </div>
                    <div tw="flex items-center cursor-pointer" ref={handleRef}>
                        <span tw="text-sm">@{username}</span>
                        <BiChevronDown tw="text-gray-600" />
                    </div>
                    <Popup handleRef={handleRef}>
                        <PopupLink href="/~">Home</PopupLink>
                        <PopupLink href={`/${username}`}>Profile</PopupLink>
                        <PopupLink href="/account">Account</PopupLink>
                        <PopupLink href="/api/logout">Log out</PopupLink>
                    </Popup>
                </div>
                <ClickableIcon>
                    <BiBell />
                </ClickableIcon>
            </div>
            <button
                tw="bg-blue-200 text-blue-600 h-7 w-7 grid place-items-center rounded-lg hover:(bg-blue-300 text-blue-800) transition-colors"
                onClick={() => setModalOpen(true)}
            >
                <BiPlus />
            </button>
        </>
    );
};

export default HeaderAuth;
