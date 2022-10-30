import { BiX } from "react-icons/bi";

interface ButtonCloseProps {
    onClick?: () => void;
}

const ButtonClose = ({ onClick }: ButtonCloseProps) => {
    return (
        <button
            tw="w-5 h-5 grid place-items-center hover:(bg-gray-100 cursor-pointer) rounded-sm transition-colors"
            onClick={onClick}
        >
            <BiX />
        </button>
    );
};

export default ButtonClose;
