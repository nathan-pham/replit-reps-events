import useEventStore from "hooks/useEventStore";
import { BiPlus, BiChevronDown, BiUser } from "react-icons/bi";
import HeaderNotifications from "./HeaderNotifications";

interface HeaderAuthProps {
    username: string;
    avatar: string;
}

const HeaderAuth = ({ username, avatar }: HeaderAuthProps) => {
    const setModalOpen = useEventStore((s) => s.setModalOpen);

    return (
        <>
            <div tw="flex items-center">
                <div tw="flex items-center mr-5">
                    <div tw="h-8 w-8 rounded-full border mr-2 overflow-hidden">
                        {avatar ? (
                            <img src={avatar} tw="w-full h-full object-cover" />
                        ) : (
                            <div tw="w-full h-full grid place-items-center bg-gray-100">
                                <BiUser />
                            </div>
                        )}
                    </div>
                    <span tw="text-sm">@{username}</span>
                    <BiChevronDown tw="text-gray-600" />
                </div>
                <HeaderNotifications />
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
