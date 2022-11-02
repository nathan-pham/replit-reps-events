import EventChip from "components/EventChip";
import { Event } from "schema";

interface EventChipsProps {
    events: Event[];
}

const EventChips = ({ events }: EventChipsProps) => {
    return (
        <div tw="grid grid-cols-3 gap-3 mt-3">
            {events.map((event: Event) => (
                <EventChip key={event.id} {...event} />
            ))}
        </div>
    );
};

export default EventChips;
