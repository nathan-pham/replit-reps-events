import { twMerge } from "tailwind-merge";
import { useMutation, useQuery } from "urql";
import EventImages from "components/graphql/EventImages.graphql";
import UpdateEventHero from "components/graphql/UpdateEventHero.graphql";
import { Event } from "schema";
import useRefresh from "hooks/useRefresh";
import useToastStore from "hooks/useToastStore";

const ModalEventImages = ({ id, hero }: Event) => {
    const refresh = useRefresh();
    const addToast = useToastStore((s) => s.addToast);

    const [eventImages] = useQuery({ query: EventImages });
    const [_, updateEventHero] = useMutation(UpdateEventHero);

    return (
        <>
            {(eventImages.data?.eventImages || []).map((src: string) => (
                <div
                    key={src}
                    tw="before:(absolute top-1.5 left-1.5 px-2 py-1 rounded-md text-sm)"
                    className={twMerge(
                        "w-full h-36 mt-3 cursor-pointer relative grayscale hover:grayscale-0 transition-all",
                        src.replace(/\\/g, "/") === hero &&
                            "grayscale-0 before:content-['Selected'] before:bg-white "
                    )}
                    onClick={async () => {
                        await updateEventHero({
                            id,
                            hero: src,
                        });

                        addToast("Success!", "Check out that new banner!");
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
