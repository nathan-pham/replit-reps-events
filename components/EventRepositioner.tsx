import { BiUpload, BiMove, BiArrowFromRight, BiBlock } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import { Button } from "components/utils/atoms";
import { Event } from "schema";
import { twMerge } from "tailwind-merge";

import { useMutation } from "urql";
import UpdateEventHero from "components/graphql/UpdateEventHero.graphql";
import useRefresh from "hooks/useRefresh";
import useToastStore from "hooks/useToastStore";

interface EventRepositionerProps {
    hero: Event["hero"];
    heroY: Event["heroY"];
    heroOpen: boolean;
    setHeroOpen: (_: boolean) => void;
}

const EventRepositioner = ({
    id,
    hero,
    heroY,
    setHeroOpen,
}: EventRepositionerProps & Partial<Event>) => {
    const [positioning, setPositioning] = useState(false);
    const [localHeroY, setLocalHeroY] = useState(heroY);

    const addToast = useToastStore((s) => s.addToast);
    const [_, updateEventHero] = useMutation(UpdateEventHero);
    const refresh = useRefresh();

    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const mouseDown = useRef(false);

    useEffect(() => {
        const ref = imageWrapperRef.current;

        const onMouseMove = (e: MouseEvent) => {
            const bbox = ref?.getBoundingClientRect();
            if (bbox && mouseDown.current && positioning) {
                setLocalHeroY((y) =>
                    Math.max(Math.min(y + e.movementY, 100), 0)
                );
            }
        };

        const onMouseDown = () => (mouseDown.current = true);
        const onMouseUp = () => (mouseDown.current = false);

        ref?.addEventListener("mousemove", onMouseMove);
        ref?.addEventListener("mousedown", onMouseDown);
        ref?.addEventListener("mouseup", onMouseUp);

        return () => {
            ref?.removeEventListener("mousemove", onMouseMove);
            ref?.removeEventListener("mousedown", onMouseDown);
            ref?.removeEventListener("mouseup", onMouseUp);
        };
    }, [positioning]);

    return (
        <div
            tw="w-full h-72 relative rounded-xl border overflow-hidden bg-gray-200 select-none"
            className={twMerge("group", positioning && "cursor-move")}
            ref={imageWrapperRef}
        >
            <img
                src={hero}
                tw="w-full h-full object-cover pointer-events-none"
                style={{
                    objectPosition: `0% ${localHeroY}%`,
                }}
            />
            <div tw="absolute right-3 bottom-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {positioning ? (
                    <>
                        <Button
                            onClick={async () => {
                                await updateEventHero({
                                    id,
                                    heroY: localHeroY,
                                });

                                setPositioning(false);
                                addToast(
                                    "Updated Event",
                                    "Check out that new banner!"
                                );
                                refresh();
                            }}
                        >
                            <BiUpload />
                            Save position
                        </Button>
                        <Button
                            variant="hollow"
                            onClick={() => {
                                setPositioning(false);
                                setLocalHeroY(heroY);
                            }}
                        >
                            <BiBlock />
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => setHeroOpen(true)}>
                            <BiArrowFromRight />
                            Change
                        </Button>
                        <Button
                            variant="hollow"
                            onClick={() => setPositioning(true)}
                        >
                            <BiMove />
                            Reposition
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventRepositioner;
