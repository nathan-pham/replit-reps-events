import create from "zustand";
import { v4 } from "uuid";

export interface Toast {
    title: string;
    description: string;
    icon: string;
    id: string;
}

export interface Store {
    toasts: Toast[];
    addToast: (
        title: string,
        description: string,
        icon?: string,
        id?: string
    ) => void;
    removeToast: (id: string) => void;
}

const useStore = create<Store>((set, get) => ({
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

export default useStore;
