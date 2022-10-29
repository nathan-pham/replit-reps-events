import supabase, { EVENT_TABLE, USER_TABLE } from "schema/supabase";
import { User, Event } from "schema";
import { GraphQLYogaError } from "@graphql-yoga/node";
import UserModel from "schema/User/UserModel";

export default class EventModel {
    static async createEvent(
        partialUser: Partial<User>,
        title: string,
        published: boolean
    ) {
        if (!partialUser.username) {
            return Promise.reject(new GraphQLYogaError("Username not found"));
        }

        const user = await UserModel.findByUsername(partialUser.username);

        // create event
        const { data } = await supabase.from(EVENT_TABLE).insert({
            hero: "",
            title,
            description: "",
            blocks: [],
            published,
            submissions: [],
        });

        if (data && Array.isArray(data) && data.length > 0) {
            const event = data[0] as Event;

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
}
