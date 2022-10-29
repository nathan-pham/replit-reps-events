import useStore, { Toast as ToastProps } from "hooks/useStore";
import { BiX } from "react-icons/bi";
import { motion } from "framer-motion";

const toast = {
    show: {
        opacity: 1,
        scale: 1,
        y: 0,
    },
    hidden: {
        opacity: 0,
        scale: 0,
        y: "100%",
    },
};

const Toast = (props: ToastProps) => {
    const removeToast = useStore((s) => s.removeToast);

    return (
        <motion.aside
            tw="px-4 py-2 mt-3 border rounded-md bg-white shadow-md w-56"
            variants={toast}
            initial="hidden"
            animate="show"
            exit="hidden"
        >
            <h1 tw="flex items-center justify-between">
                <span tw="font-semibold">{props.title}</span>
                <div
                    tw="w-5 h-5 grid place-items-center hover:(bg-gray-100 cursor-pointer) rounded-sm transition-colors"
                    onClick={() => removeToast(props.id)}
                >
                    <BiX />
                </div>
            </h1>
            <p tw="text-gray-500 leading-snug mt-1">{props.description}</p>
        </motion.aside>
    );
};

export default Toast;
