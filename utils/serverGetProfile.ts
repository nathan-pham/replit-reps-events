import type { GetServerSidePropsContext } from "next";
import type { User } from "schema";

import Cookies from "cookies";
import UserModel from "schema/User/UserModel";
import EventModel from "schema/Event/EventModel";
import { validateToken } from "utils/manageToken";

/**
 * Easily retrieve the user from cookies
 * @param req - Next.js request context
 * @param res - Next.js response context
 * @returns User
 */
export const serverGetUser = async (
    req: GetServerSidePropsContext["req"],
    res: GetServerSidePropsContext["res"]
) => {
    const userToken = new Cookies(req, res).get("token");
    if (!userToken) throw new Error("Not authenticated");

    const userPartial = validateToken(userToken);
    if (!userPartial) throw new Error("Invalid token");

    const user = await UserModel.findByUsername(userPartial.username);
    return user;
};

/**
 * Get all of the users' events (or any events by id)
 * @param eventIds - List of event ids stored in users
 * @returns Events
 */
export const serverGetUserEvents = async (eventIds: User["events"]) => {
    const events = await Promise.all(
        (eventIds as unknown as string[]).map((id) =>
            EventModel.findEventById(id).catch(() => null)
        )
    );

    // filter out null/errored out events
    return events.filter((event) => event);
};
