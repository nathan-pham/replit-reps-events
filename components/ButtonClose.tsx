import { twMerge } from "tailwind-merge";
import { ClickableIcon } from "components/utils/styles";
import { BiX } from "react-icons/bi";

interface ButtonCloseProps {
    variant?: "default" | "large";
    onClick?: () => void;
}

const ButtonClose = ({ variant = "default", onClick }: ButtonCloseProps) => {
    return (
        <ClickableIcon
            className={twMerge(
                "grid place-items-center",
                variant === "large" && "w-7 h-7 text-lg rounded-lg p-0"
            )}
            onClick={onClick}
        >
            <BiX />
        </ClickableIcon>
    );
};

export default ButtonClose;
