import useToastStore, { Toast as ToastProps } from "hooks/useToastStore";
import { motion } from "framer-motion";
import ButtonClose from "components/ButtonClose";

const toast = {
    show: {
        opacity: 1,
        x: 0,
    },
    hidden: {
        opacity: 0,
        x: "100%",
    },
};

const Toast = (props: ToastProps) => {
    const removeToast = useToastStore((s) => s.removeToast);

    return (
        <motion.aside
            tw="px-4 py-2 mt-3 border rounded-md bg-white shadow-md w-60"
            variants={toast}
            initial="hidden"
            animate="show"
            exit="hidden"
        >
            <h1 tw="flex items-center justify-between">
                <span tw="font-semibold">{props.title}</span>
                <ButtonClose onClick={() => removeToast(props.id)} />
            </h1>
            <p tw="text-gray-500 leading-snug mt-1 text-sm">
                {props.description}
            </p>
        </motion.aside>
    );
};

export default Toast;
