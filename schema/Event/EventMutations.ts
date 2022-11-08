import { GraphQLYogaError } from "@graphql-yoga/node";
import { Event, Resolvers } from "schema";
import EventModel from "schema/Event/EventModel";
import supabase, { EVENT_TABLE, USER_TABLE } from "schema/supabase";
import UserModel from "schema/User/UserModel";

export const EventMutations: Resolvers["Mutation"] = {
    // updateEventBlocks: () => {
    //     return {} as Event
    // },
    // updateEventHeroY: () => {},
    // updateEventDetails: () => {},
    updateEventHero: async (_, { id, hero, heroY }, { token }) => {
        const event = await EventModel.findEventById(id);
        const userPartial = await UserModel.validateUser(token);
        const user = await UserModel.findByUsername(userPartial.username);

        // event must belong to you
        if (user.events.includes(event.id)) {
            return EventModel.updateEvent(event.id, () => ({
                ...(hero && { hero }),
                ...(heroY && { heroY }),
            }));
        }

        return Promise.reject(
            new GraphQLYogaError(
                "You cannot delete an modify that isn't yours!"
            )
        );
    },

    createEvent: async (_, { title, tagline, published }, { token }) => {
        return EventModel.createEvent(
            await UserModel.validateUser(token),
            title.trim(),
            tagline.trim(),
            published
        );
    },
    deleteEvent: async (_, { id }, { token }) => {
        const event = await EventModel.findEventById(id);
        const userPartial = await UserModel.validateUser(token);
        const user = await UserModel.findByUsername(userPartial.username);

        // check the event belongs to you
        if (user.events.includes(event.id)) {
            // delete from events table & associated id in users
            await supabase.from(EVENT_TABLE).delete().eq("id", id);
            await supabase
                .from(USER_TABLE)
                .update({
                    events: user.events.filter((id) => id !== event.id),
                })
                .eq("username", userPartial.username);

            return event;
        }

        return Promise.reject(
            new GraphQLYogaError("You cannot delete an event that isn't yours!")
        );
    },
};
