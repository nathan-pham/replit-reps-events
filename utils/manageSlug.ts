/**
 * Build the event slug
 * @param username - Owner of event
 * @param id - Id of event
 * @param title - Title of event
 * @returns Slug in username/id-event-title format
 */
export const buildSlug = (username: string, id: string, title: string) =>
    `/${username}/${id}-${title.toLowerCase().split(" ").join("-")}`;

/**
 * Separate out the event details from a slug
 * @param slug - Slug from url in id-event-title format
 * @param delimeter - Event separator, defaults to "-"
 * @returns Event id and event slug
 */
export const separateSlug = (slug: string, delimeter = "-") => {
    const [eventId, ...slugParts] = slug.split(delimeter);
    return {
        eventId,
        eventSlug: slugParts.join(delimeter),
    };
};
