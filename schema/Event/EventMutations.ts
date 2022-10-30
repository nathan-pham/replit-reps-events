import { GraphQLYogaError } from "@graphql-yoga/node";
import { Event, Resolvers } from "schema";
import EventModel from "schema/Event/EventModel";
import supabase, { EVENT_TABLE } from "schema/supabase";
import UserModel from "schema/User/UserModel";

export const EventMutations: Resolvers["Mutation"] = {
    createEvent: async (_, { title, published }, { token }) => {
        return EventModel.createEvent(
            await UserModel.validateUser(token),
            title,
            published
        );
    },
    deleteEvent: async (_, { id }, { token }) => {
        const event = await EventModel.findEventById(id);
        const userPartial = await UserModel.validateUser(token);
        if (userPartial) {
            const user = await UserModel.findByUsername(userPartial.username);

            const myEvent = user.events.includes(event.id);

            if (myEvent) {
                await supabase.from(EVENT_TABLE).delete().eq("id", id);
                return event;
            }
        }

        return Promise.reject(
            new GraphQLYogaError("You cannot delete an event that isn't yours!")
        );
    },
};
