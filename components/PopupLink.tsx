import Link from "next/link";
import { ReactNode } from "react";

interface PopupLinkProps {
    href: string;
    children: ReactNode;
}

const PopupLink = ({ href, children }: PopupLinkProps) => {
    return (
        <Link href={href}>
            <a tw="block px-2 py-1 cursor-pointer text-sm hover:(bg-gray-100) transition-colors">
                {children}
            </a>
        </Link>
    );
};

export default PopupLink;
