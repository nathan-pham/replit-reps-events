import { ClickableIcon } from "components/utils/styles";
import { BiX } from "react-icons/bi";

interface ButtonCloseProps {
    onClick?: () => void;
}

const ButtonClose = ({ onClick }: ButtonCloseProps) => {
    return (
        <ClickableIcon
            tw="w-5 h-5 grid place-items-center p-0"
            onClick={onClick}
        >
            <BiX />
        </ClickableIcon>
    );
};

export default ButtonClose;
