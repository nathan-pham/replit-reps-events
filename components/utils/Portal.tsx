import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
    as?: string;

    [key: string]: any;
}

const Portal = ({ as = "div", children, ...props }: PortalProps) => {
    const portalRef = useRef(
        typeof window === "undefined" ? null : document.createElement(as)
    );

    if (portalRef.current === null) {
        return <>{children}</>;
    }

    useEffect(() => {
        if (portalRef.current) {
            Object.assign(portalRef.current, props);
            document.body.appendChild(portalRef.current);
        }

        () => portalRef.current?.remove();
    }, []);

    return createPortal(children, portalRef.current);
};

export default Portal;
