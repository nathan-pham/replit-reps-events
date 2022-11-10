import { useUser } from "hooks/useUserStore";
import Link from "next/link";
import { Event } from "schema";
import { buildSlug } from "utils/manageSlug";

const EventChip = ({ id, hero, heroY, title, description }: Event) => {
    const user = useUser();

    return (
        <Link href={buildSlug(user.username!, id, title)}>
            <div tw="border hover:(border-gray-300 shadow-md -translate-y-0.5) rounded-md cursor-pointer transition-all">
                <img
                    tw="h-28 w-full object-cover object-top rounded-tr-md rounded-tl-md"
                    src={hero}
                    style={{
                        objectPosition: `0% ${heroY}%`,
                    }}
                />
                <div tw="p-2">
                    <h2 tw="font-semibold text-lg">{title}</h2>
                    <p tw="text-gray-500 text-sm max-w-full whitespace-nowrap overflow-x-hidden text-ellipsis">
                        {description || "This event has no description."}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default EventChip;
