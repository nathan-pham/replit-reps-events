import supabase, { EVENT_TABLE, USER_TABLE } from "schema/supabase";
import { User, Event } from "schema";
import { GraphQLYogaError } from "@graphql-yoga/node";
import UserModel from "schema/User/UserModel";
import isValidData from "utils/isValidData";

export default class EventModel {
    static async findEventById(id: string) {
        const { data } = await supabase.from(EVENT_TABLE).select().eq("id", id);

        if (isValidData(data)) {
            const event = data![0] as Event;
            return event;
        }

        return Promise.reject(new GraphQLYogaError("Invalid event id"));
    }

    static async createEvent(
        partialUser: Partial<User>,
        title: string,
        description: string,
        published: boolean
    ) {
        if (!partialUser.username) {
            return Promise.reject(new GraphQLYogaError("Username not found"));
        }

        const user = await UserModel.findByUsername(partialUser.username);

        // create event
        const { data } = await supabase.from(EVENT_TABLE).insert({
            hero: "/eventImages/defaultEvent.jpg",
            heroY: 0,
            title,
            description,
            blocks: [],
            published,
            users: [],
            submissions: [],
            author: user.id,
        });

        if (isValidData(data)) {
            const event = data![0] as Event;

            // add link to user
            await supabase
                .from(USER_TABLE)
                .update({
                    events: [...(user.events || []), event.id],
                })
                .eq("id", user.id);

            return event;
        }

        return Promise.reject(new GraphQLYogaError("Failed to create event"));
    }

    static async updateEvent(
        eventId: string,
        fieldsCb: (event: Event) => Record<string, any> | null
    ) {
        const event = await EventModel.findEventById(eventId);
        const newFields = fieldsCb(event);

        if (newFields) {
            const { data } = await supabase
                .from(EVENT_TABLE)
                .update(newFields)
                .eq("id", eventId);

            if (isValidData(data)) {
                return data![0] as Event;
            }
            return Promise.reject(
                new GraphQLYogaError("Could not update event")
            );
        }

        return event;
    }
}
