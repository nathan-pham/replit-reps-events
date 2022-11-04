import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";

interface PopupProps {
    children: ReactNode;
    handleRef: RefObject<HTMLElement>;
    overrideShow?: boolean;
    handleMode?: "center" | "left";
    clickable?: boolean;
}

const popup = {
    enter: {
        opacity: 1,
        y: 0,
    },
    leave: {
        opacity: 0,
        y: 20,
    },
};

const positionPopup = (
    handleEl: HTMLElement | null,
    popupEl: HTMLElement | null,
    handleMode: PopupProps["handleMode"]
) => {
    if (!(handleEl && popupEl)) {
        return;
    }

    const handleBbox = handleEl.getBoundingClientRect();
    const popupBbox = popupEl.getBoundingClientRect();
    const margin = 8;

    switch (handleMode) {
        case "left":
            Object.assign(popupEl.style, {
                left: `${handleBbox.left}px`,
                top: `${handleBbox.bottom + margin}px`,
            });
            break;

        case "center":
        default:
            Object.assign(popupEl.style, {
                left: `${handleBbox.left - handleBbox.width / 2}px`,
                top: `${handleBbox.bottom + margin}px`,
                transform: "translateX(50%)",
            });
            break;
    }
};

const Popup = ({
    handleRef,
    handleMode = "left",
    clickable = false,
    overrideShow = true,
    children,
}: PopupProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    // bit hacky
    // delay to adjust to the new height; for rapidly changing heights driven by state
    useEffect(() => {
        let timeoutId = setTimeout(() => {
            positionPopup(handleRef.current, ref.current, handleMode);
        }, 1);

        return () => clearTimeout(timeoutId);
    }, [overrideShow]);

    useEffect(() => {
        const openPopup = () => {
            positionPopup(handleRef.current, ref.current, handleMode);
            setShow(true);
        };

        const closePopup = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // if you've clicked inside of the popup or on the handle, don't close
            if (
                (ref.current?.contains(target) && clickable) ||
                handleRef.current?.contains(target)
            ) {
                return;
            }

            setShow(false);
        };

        // event listeners
        handleRef.current?.addEventListener("click", openPopup);
        addEventListener("click", closePopup);
        return () => {
            handleRef.current?.removeEventListener("click", openPopup);
            removeEventListener("click", closePopup);
        };
    }, []);

    return (
        <div ref={ref} tw="fixed z-30">
            <AnimatePresence>
                {show && overrideShow && (
                    <motion.div
                        tw="rounded-md border shadow-lg bg-white overflow-y-auto"
                        variants={popup}
                        animate="enter"
                        initial="leave"
                        exit="leave"
                    >
                        <div className="min-w-[8rem] max-h-[8rem]">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Popup;
