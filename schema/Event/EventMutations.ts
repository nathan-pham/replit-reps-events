import { Event, Resolvers } from "schema";
import EventModel from "schema/Event/EventModel";
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
        return {} as Event;
    },
};
