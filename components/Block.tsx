import { useRef, useState } from "react";
import { BiPlus, BiGridVertical, BiCog } from "react-icons/bi";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
    Editable,
    EditableSet,
    ClickableIcon,
    PopupAnchor,
} from "components/utils/styles";
import useEditorStore from "hooks/useEditorStore";
import Popup from "components/Popup";
import BlockOptions from "components/BlockOptions";
import { EventBlock as BlockProps } from "schema";
import BlockLogic from "components/BlockLogic";

// const blockStyles = {
//     h1: "text-3xl font-bold",
//     h2: "text-2xl font-bold",
// };

const Block = ({ content, type, id }: BlockProps) => {
    const [insertBlock, updateBlock, removeBlock] = useEditorStore((s) => [
        s.insertBlock,
        s.updateBlock,
        s.removeBlock,
    ]);

    const [overrideShow, setOverrideShow] = useState(false);

    const editRef = useRef<any>(null);
    const addButtonRef = useRef<HTMLButtonElement>(null);
    const dragButtonRef = useRef<HTMLButtonElement>(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    return (
        <Editable
            className="group mt-1"
            ref={setNodeRef}
            style={{
                transform: CSS.Translate.toString(transform),
                transition,
                opacity: isDragging ? 0.3 : 1,
            }}
        >
            <EditableSet>
                <ClickableIcon ref={addButtonRef}>
                    <BiPlus />
                </ClickableIcon>
                <ClickableIcon ref={dragButtonRef}>
                    <BiCog />
                </ClickableIcon>
                <ClickableIcon {...listeners} {...attributes}>
                    <BiGridVertical tw="cursor-grab" />
                </ClickableIcon>
            </EditableSet>

            <Popup handleRef={addButtonRef}>
                <BlockOptions
                    content={content}
                    onClick={(option: string) => {
                        insertBlock(id, option, "");
                    }}
                />
            </Popup>

            <Popup handleRef={dragButtonRef}>
                <PopupAnchor onClick={() => insertBlock(id, type, content)}>
                    Duplicate
                </PopupAnchor>
                <PopupAnchor onClick={() => removeBlock(id)}>
                    Delete
                </PopupAnchor>
            </Popup>

            <BlockLogic
                {...{ editRef, content, type }}
                onChange={(e) => {
                    const content = e.target.value as string;
                    updateBlock(id, { content });

                    if (content.trim().startsWith(">")) {
                        setOverrideShow(true);
                        editRef.current?.click();
                    } else {
                        setOverrideShow(false);
                    }
                }}
            />

            <Popup handleRef={editRef} overrideShow={overrideShow}>
                <BlockOptions
                    content={content}
                    onClick={(option: string) => {
                        updateBlock(id, { type: option, content: "" });
                        setOverrideShow(false);
                    }}
                />
            </Popup>
        </Editable>
    );
};

export default Block;
