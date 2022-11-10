import { ChangeEvent, RefObject, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface BlockLogicProps {
    onChange: (e: ChangeEvent<any>) => void;
    editRef: RefObject<any>;
    content: string;
    type: string;
}

const BlockLogic = ({ onChange, editRef, content, type }: BlockLogicProps) => {
    useEffect(() => {
        if (
            editRef.current &&
            editRef.current.tagName.toLowerCase() === "textarea"
        ) {
            editRef.current.style.height = "0px";
            editRef.current.style.height = `${editRef.current.scrollHeight}px`;
        }
    }, [content]);

    const is = (specificType: string) => type === specificType;
    const [hide, setHide] = useState(true);

    switch (type) {
        case "line":
            return (
                <div tw="w-full py-2">
                    <hr tw="w-full" />
                </div>
            );

        // logic

        // media
        case "image":
        case "video":
            return (
                <div tw="w-full">
                    <input
                        onChange={(e) => {
                            onChange(e);
                        }}
                        value={content}
                        ref={editRef}
                        className="w-full outline-none text-sm text-gray-500"
                        placeholder="Enter media url"
                    />
                    <div
                        tw="mt-1"
                        className={twMerge(
                            "[&>*]:max-w-full [&>*]:max-h-[20rem] [&>*]:border [&>*]:rounded-xl",
                            hide && "hidden"
                        )}
                    >
                        {content &&
                            (is("image") ? (
                                <img
                                    src={content}
                                    onLoad={() => setHide(false)}
                                    onError={() => setHide(true)}
                                    className="object-cover object-top"
                                />
                            ) : (
                                <video
                                    controls
                                    onCanPlay={() => setHide(false)}
                                    onError={() => setHide(true)}
                                >
                                    <source src={content}></source>
                                    Failed to load video.
                                </video>
                            ))}
                    </div>
                </div>
            );

        case "h1":
        case "h2":
        case "text":
        case "markdown":
        case "quote":
        default:
            return (
                <textarea
                    onChange={onChange}
                    ref={editRef}
                    autoComplete="off"
                    spellCheck={false}
                    className={twMerge(
                        "w-full resize-none overflow-hidden outline-none",
                        is("quote") && "pl-2 border-l-4"
                    )}
                    value={content}
                    placeholder="Type > for more blocks"
                ></textarea>
            );
    }
};

export default BlockLogic;
