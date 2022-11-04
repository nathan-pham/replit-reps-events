import create from "zustand";
import { v4 } from "uuid";

export interface Block {
    type: string;
    content: string;
    id: string;
}

interface EditorStore {
    blocks: Block[];
    setBlocks: (blocks: Block[]) => void;
    addBlock: (type: string, content: string) => void;
    insertBlock: (id: string, type: string, content: string) => void;
    updateBlock: (id: string, partialBlock: Partial<Block>) => void;
}

const createBlock = (type: string, content: string) => ({
    type,
    content,
    id: v4(),
});

const useEditorStore = create<EditorStore>((set, get) => ({
    blocks: [{ type: "text", content: "Hello World", id: v4() }],
    setBlocks: (blocks) => set({ blocks }),

    addBlock: (type, content) =>
        set({ blocks: [...get().blocks, createBlock(type, content)] }),

    insertBlock: (id, type, content) =>
        set(() => {
            const idx = get().blocks.findIndex((b) => b.id === id) + 1;

            return {
                blocks: [
                    ...get().blocks.slice(0, idx),
                    createBlock(type, content),
                    ...get().blocks.slice(idx),
                ],
            };
        }),

    updateBlock: (id, partialBlock) =>
        set({
            blocks: get().blocks.map((block) => {
                if (block.id === id) {
                    return { ...block, ...partialBlock };
                }

                return block;
            }),
        }),
}));

export default useEditorStore;
