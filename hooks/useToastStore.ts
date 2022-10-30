import create from "zustand";
import { v4 } from "uuid";

export interface Toast {
    title: string;
    description: string;
    icon: string;
    id: string;
}

export interface ToastStore {
    toasts: Toast[];
    removeToast: (id: string) => void;
    addToast: (
        title: string,
        description: string,
        icon?: string,
        id?: string
    ) => void;
}

const useToastStore = create<ToastStore>((set, get) => ({
    toasts: [],
    addToast: (title, description, icon = "none", id = v4()) =>
        set({
            toasts: [...get().toasts, { title, description, icon, id }],
        }),
    removeToast: (id) =>
        set({
            toasts: get().toasts.filter((toast) => toast.id !== id),
        }),
}));

export default useToastStore;
