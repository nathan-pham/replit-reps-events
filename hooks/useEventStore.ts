import create from "zustand";

interface EventStore {
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
}

const useEventStore = create<EventStore>((set) => ({
    modalOpen: false,
    setModalOpen: (modalOpen) => set({ modalOpen }),
}));

export default useEventStore;
