import { Event } from "schema";

const EventChip = ({ hero, title, description }: Event) => {
    return (
        <div tw="p-2 border hover:(border-gray-300) rounded-md cursor-pointer transition-colors">
            <img
                tw="h-28 w-full object-cover object-top rounded-md"
                src={hero || "/defaultEvent.jpg"}
            />
            <h2 tw="font-semibold text-lg">{title}</h2>
            <p tw="text-gray-500 text-sm">
                {description || "This event has no description."}
            </p>
        </div>
    );
};

export default EventChip;