import useStore from "hooks/useStore";
import Toast from "components/Toast";
import { AnimatePresence } from "framer-motion";

const Toasts = () => {
    const toasts = useStore((s) => s.toasts);

    return (
        <div className="fixed bottom-3 right-3">
            <AnimatePresence>
                {toasts.map((t) => (
                    <Toast {...t} key={t.id} />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toasts;
