import { PopupAnchor, PopupTitle } from "components/utils/styles";

export const blockTypes = {
    basic: ["Markdown", "Header (h1)", "Header (h2)", "Line", "Quote"],
    media: ["Image", "Video"],
    logic: ["Task", "Submit Button"],
};

interface BlockOptionsProps {
    content: string;
    onClick?: (option: string) => void;
}

const BlockOptions = ({ content, onClick = (_) => {} }: BlockOptionsProps) => {
    return (
        <>
            {Object.entries(blockTypes).map(([title, blocks]) => (
                <div key={title}>
                    <PopupTitle>{title}</PopupTitle>
                    {blocks
                        .filter((block) => {
                            // if starts with >, check if it matches the block (basic filtering)
                            if (content.trim().startsWith(">")) {
                                if (
                                    block
                                        .toLowerCase()
                                        .includes(
                                            content.slice(1).toLowerCase()
                                        )
                                ) {
                                    return block;
                                }
                            } else {
                                return block;
                            }
                        })
                        .map((block) => (
                            <PopupAnchor
                                key={block}
                                onClick={() => {
                                    const regExp = /\(([^)]+)\)/;
                                    const matches = regExp.exec(block);

                                    if (matches && matches[1]) {
                                        onClick(matches[1].toLowerCase());
                                        return;
                                    }

                                    onClick(
                                        block.toLowerCase().replace(/ /g, "")
                                    );
                                }}
                            >
                                {block}
                            </PopupAnchor>
                        ))}
                </div>
            ))}
        </>
    );
};

export default BlockOptions;
