import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useRef } from "react";

import ButtonClose from "components/ButtonClose";
import { H1 } from "components/utils/atoms";
import Portal from "components/utils/Portal";

interface ModalProps {
    title: string;
    show: boolean;
    setShow: (state: boolean) => void;
    children: ReactNode;
}

const modalWrapper = {
    enter: {
        opacity: 1,
    },
    leave: {
        opacity: 0,
    },
};

const modal = {
    enter: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.5,
        },
    },
    leave: {
        opacity: 0,
        scale: 0,
    },
};

const Modal = ({ title, show, setShow, children }: ModalProps) => {
    const parentRef = useRef<HTMLDivElement>(null);

    return (
        <AnimatePresence>
            {show && (
                <Portal>
                    <motion.div
                        tw="fixed top-0 left-0 z-40 w-full h-full bg-white bg-opacity-50 grid place-items-center"
                        variants={modalWrapper}
                        animate="enter"
                        initial="leave"
                        exit="leave"
                        ref={parentRef}
                        onClick={(e) => {
                            if (e.target === parentRef.current) {
                                setShow(false);
                            }
                        }}
                    >
                        <motion.div
                            tw="rounded-md shadow-xl p-4 bg-white border w-80"
                            variants={modal}
                            animate="enter"
                            initial="leave"
                            exit="leave"
                        >
                            <div tw="flex items-center justify-between">
                                <H1>{title}</H1>
                                <ButtonClose onClick={() => setShow(false)} />
                            </div>
                            {children}
                        </motion.div>
                    </motion.div>
                </Portal>
            )}
        </AnimatePresence>
    );
};

export default Modal;
