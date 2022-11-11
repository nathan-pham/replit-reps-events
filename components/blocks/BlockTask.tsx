import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { BiCheck } from "react-icons/bi";

import { BlockLogicProps } from "components/BlockLogic";

const BlockTask = ({ id, onChange, content, editRef }: BlockLogicProps) => {
    const [complete, setComplete] = useState(
        localStorage.getItem(id) === "true"
    );

    useEffect(() => {
        localStorage.setItem(id, complete.toString());
    }, [complete]);

    return (
        <div tw="p-2 border rounded-lg flex items-center gap-2 w-full">
            <div
                className={twMerge(
                    "h-9 w-9 border rounded-full flex-grow-0 flex-shrink-0 cursor-pointer grid place-items-center transition-colors",
                    complete && "bg-green-500 text-white"
                )}
                onClick={() => setComplete(!complete)}
            >
                <BiCheck />
            </div>
            <input
                onChange={(e) => {
                    onChange(e);
                }}
                value={content}
                ref={editRef}
                className="w-full outline-none"
                placeholder="Task description"
            />
        </div>
    );
};

export default BlockTask;
