/**
 * Build the event slug
 * @param username - Owner of event
 * @param id - Id of event
 * @param title - Title of event
 * @returns Slug in @username/id-event-title format
 */
const buildSlug = (username: string, id: string, title: string) =>
    `/@${username}/${id}-${title.toLowerCase().split(" ").join("-")}`;

export default buildSlug;
