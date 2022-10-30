import create from "zustand";
import { useEffect } from "react";
import { User } from "schema";

interface UserStore {
    user: User | Partial<User>;
    setUser: (user: User) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: {},
    setUser: (user) => set({ user }),
}));

export default useUserStore;

/**
 * Easily get or set the user
 * @param user - Logged in user
 * @returns User from store
 */
export const useUser = (user?: User) => {
    const [storeUser, setUser] = useUserStore((s) => [s.user, s.setUser]);
    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user]);

    return storeUser;
};
