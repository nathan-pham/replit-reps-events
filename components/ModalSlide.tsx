import ButtonClose from "components/ButtonClose";
import { H1 } from "components/utils/atoms";
import { ReactNode, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Portal from "components/utils/Portal";

interface ModalSlideProps {
    title: string;
    show: boolean;
    setShow: (state: boolean) => void;
    children: ReactNode;
}

const modalSlide = {
    enter: {
        opacity: 1,
    },
    leave: {
        opacity: 0,
    },
};

const modalAside = {
    enter: {
        x: 0,
    },
    leave: {
        x: "100%",
    },
};

const ModalSlide = ({ title, show, setShow, children }: ModalSlideProps) => {
    useEffect(() => {}, []);

    const parentRef = useRef<HTMLDivElement>(null);

    return (
        <Portal>
            <AnimatePresence>
                {show && (
                    <motion.div
                        tw="h-screen w-screen bg-white bg-opacity-50 fixed top-0 left-0 overflow-hidden"
                        variants={modalSlide}
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
                        <motion.aside
                            tw="bg-white h-screen overflow-y-auto absolute right-0 shadow-xl p-4"
                            className="w-[30rem] max-w-[100vw]"
                            variants={modalAside}
                            animate="enter"
                            initial="leave"
                            exit="leave"
                        >
                            <div tw="flex items-center justify-between">
                                <H1 tw="text-3xl">{title}</H1>
                                <ButtonClose
                                    variant="large"
                                    onClick={() => setShow(false)}
                                />
                            </div>
                            {children}
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </Portal>
    );
};

export default ModalSlide;
