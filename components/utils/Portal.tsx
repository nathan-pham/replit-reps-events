import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
    as?: string;

    [key: string]: any;
}

const Portal = ({ as = "div", children, ...props }: PortalProps) => {
    const portalRef = useRef(document.createElement(as));

    useEffect(() => {
        Object.assign(portalRef.current, props);
        document.body.appendChild(portalRef.current);
        () => portalRef.current.remove();
    }, []);

    return createPortal(children, portalRef.current);
};

export default Portal;
