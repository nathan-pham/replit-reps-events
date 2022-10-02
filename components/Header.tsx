import { BiPlus, BiChevronDown } from "react-icons/bi";
import HeaderNotifications from "./HeaderNotifications";

const Header = () => {
    return (
        <header tw="flex items-center justify-between py-3">
            <div tw="flex items-center">
                <div tw="flex items-center mr-5">
                    <img
                        src="https://www.nathanpham.me/logo.png"
                        tw="h-8 w-8 rounded-full border mr-2"
                    />
                    <span tw="text-sm">@phamn23</span>
                    <BiChevronDown tw="text-gray-600" />
                </div>
                <HeaderNotifications />
            </div>
            <button tw="bg-blue-200 text-blue-600 h-7 w-7 grid place-items-center rounded-lg hover:(bg-blue-300 text-blue-800) transition-colors">
                <BiPlus />
            </button>
        </header>
    );
};

export default Header;
