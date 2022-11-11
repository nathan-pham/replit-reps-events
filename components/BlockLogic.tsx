import { Button } from "components/utils/atoms";
import { ChangeEvent, RefObject } from "react";

import BlockTask from "components/blocks/BlockTask";
import BlockText from "components/blocks/BlockText";
import BlockMediaWrapper from "components/blocks/BlockMediaWrapper";
import BlockLine from "components/blocks/BlockLine";

export interface BlockLogicProps {
    onChange: (e: ChangeEvent<any>) => void;
    editRef: RefObject<any>;
    content: string;
    type: string;
    id: string;
}

const BlockLogic = (props: BlockLogicProps) => {
    switch (props.type) {
        case "line":
            return <BlockLine />;

        case "task":
            return <BlockTask {...props} />;

        case "submitbutton":
            return <Button>Submit</Button>;

        // TODO: make popup move to up when it won't fit on the screen

        // media
        case "image":
        case "video":
            return <BlockMediaWrapper {...props} />;

        default:
            return <BlockText {...props} />;
    }
};

export default BlockLogic;
