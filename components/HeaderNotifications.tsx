import { BiBell } from "react-icons/bi";

const HeaderNotifications = () => {
    return (
        <div tw="p-1 rounded-md hover:(bg-gray-100 cursor-pointer) transition-colors">
            <BiBell />
        </div>
    );
};

export default HeaderNotifications;
