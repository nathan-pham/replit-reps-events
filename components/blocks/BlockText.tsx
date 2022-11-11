import { BlockLogicProps } from "components/BlockLogic";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";

const BlockText = ({ onChange, editRef, content, type }: BlockLogicProps) => {
    useEffect(() => {
        if (
            editRef.current &&
            editRef.current.tagName.toLowerCase() === "textarea"
        ) {
            editRef.current.style.height = "0px";
            editRef.current.style.height = `${editRef.current.scrollHeight}px`;
        }
    }, [content]);

    return (
        <textarea
            onChange={onChange}
            ref={editRef}
            autoComplete="off"
            spellCheck={false}
            className={twMerge(
                "w-full resize-none overflow-hidden outline-none",
                type === "quote" && "pl-2 border-l-4"
            )}
            value={content}
            placeholder="Type > to change this block"
        ></textarea>
    );
};

export default BlockText;
