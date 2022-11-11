interface BlockMediaProps {
    content: string;
    type: string;
    setHide: (_: boolean) => void;
}

const BlockMedia = ({ content, type, setHide }: BlockMediaProps) => {
    switch (type) {
        case "video":
            return (
                <video
                    controls
                    onCanPlay={() => setHide(false)}
                    onError={() => setHide(true)}
                >
                    <source src={content}></source>
                    Failed to load video.
                </video>
            );

        case "image":
        default:
            return (
                <img
                    src={content}
                    onLoad={() => setHide(false)}
                    onError={() => setHide(true)}
                    className="object-cover object-top"
                />
            );
    }
};

export default BlockMedia;
