import { Resolvers } from "schema";
import EventModel from "schema/Event/EventModel";
import UserModel from "schema/User/UserModel";

export const EventMutations: Resolvers["Mutation"] = {
    createEvent: async (_, { title, published }, { req }) => {
        const user = await UserModel.validateUser(req.headers.authorization);
        return EventModel.createEvent(user, title, published);
    },
};
