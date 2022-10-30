import { AnimatePresence } from "framer-motion";

import Toast from "components/Toast";
import useToastStore from "hooks/useToastStore";

const Toasts = () => {
    const toasts = useToastStore((s) => s.toasts);

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
