import create from "zustand";
import { v4 } from "uuid";

import { EventBlock as Block } from "schema";

// export interface Block {
//     type: string;
//     content: string;
//     id: string;
// }

interface EditorStore {
    blocks: Block[];
    setBlocks: (blocks: Block[]) => void;
    addBlock: (type: string, content: string) => void;
    removeBlock: (id: string) => void;
    insertBlock: (id: string, type: string, content: string) => void;
    updateBlock: (id: string, partialBlock: Partial<Block>) => void;
}

const createBlock = (type: string, content: string) => ({
    id: v4(),
    type,
    content,
    children: [],
});

const useEditorStore = create<EditorStore>((set, get) => ({
    blocks: [{ id: v4(), type: "text", content: "Hello World", children: [] }],
    setBlocks: (blocks) => set({ blocks }),

    removeBlock: (id) =>
        set({ blocks: get().blocks.filter((b) => b.id !== id) }),

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
