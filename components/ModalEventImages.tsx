import { twMerge } from "tailwind-merge";
import { useMutation, useQuery } from "urql";
import { useState } from "react";
import { Event } from "schema";
import EventImages from "components/graphql/EventImages.graphql";
import UpdateEventHero from "components/graphql/UpdateEventHero.graphql";
import useRefresh from "hooks/useRefresh";
import useToastStore from "hooks/useToastStore";

import path from "path";

const ModalEventImages = ({ id, hero }: Event) => {
    const refresh = useRefresh();
    const addToast = useToastStore((s) => s.addToast);

    const [eventImages] = useQuery({ query: EventImages });
    const [_, updateEventHero] = useMutation(UpdateEventHero);
    const [localHero, setLocalHero] = useState(hero);

    return (
        <>
            {(eventImages.data?.eventImages || []).map((src: string) => (
                <div
                    key={src}
                    tw="before:(absolute top-1.5 left-1.5 px-2 py-1 rounded-md text-sm)"
                    className={twMerge(
                        "w-full h-36 mt-3 cursor-pointer relative grayscale hover:grayscale-0 transition-all",
                        path.resolve(src) === path.resolve(localHero) &&
                            "grayscale-0 before:content-['Selected'] before:bg-blue-300"
                    )}
                    onClick={async () => {
                        await updateEventHero({
                            id,
                            hero: src,
                        });

                        setLocalHero(src);
                        addToast("Updated Event", "Check out that new banner!");
                        refresh();
                    }}
                >
                    <img
                        src={src}
                        alt="Replit Reps Event Image"
                        tw="rounded-lg h-full w-full object-top object-cover"
                    />
                </div>
            ))}
        </>
    );
};

export default ModalEventImages;
