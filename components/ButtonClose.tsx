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
                "grid place-items-center p-0",
                variant === "default" && "w-5 h-5",
                variant === "large" && "w-8 h-8 text-lg"
            )}
            onClick={onClick}
        >
            <BiX />
        </ClickableIcon>
    );
};

export default ButtonClose;
