import { BlockLogicProps } from "components/BlockLogic";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import BlockMedia from "components/blocks/BlockMedia";

const BlockMediaWrapper = ({
    onChange,
    editRef,
    content,
    type,
}: BlockLogicProps) => {
    const [hide, setHide] = useState(false);

    return (
        <div tw="w-full">
            <input
                onChange={onChange}
                value={content}
                ref={editRef}
                className="w-full outline-none"
                placeholder="Enter media url"
            />
            <div
                tw="mt-1"
                className={twMerge(
                    "[&>*]:max-w-full [&>*]:max-h-[20rem] [&>*]:border [&>*]:rounded-xl",
                    hide && "hidden"
                )}
            >
                <BlockMedia {...{ content, type, setHide }} />
            </div>
        </div>
    );
};

export default BlockMediaWrapper;
