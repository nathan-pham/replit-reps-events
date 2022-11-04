import { PopupAnchor } from "components/utils/styles";
import Link from "next/link";
import { ReactNode } from "react";

interface PopupLinkProps {
    href: string;
    children: ReactNode;
}

const PopupLink = ({ href, children }: PopupLinkProps) => {
    return (
        <Link href={href}>
            <PopupAnchor>{children}</PopupAnchor>
        </Link>
    );
};

export default PopupLink;
