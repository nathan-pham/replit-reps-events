import fs from "fs";
import path from "path";
export const EventQueries = {
    eventImages: () => {
        const eventImagesDir = "eventImages";
        const filenames = fs.readdirSync(
            path.resolve("./public", eventImagesDir)
        );

        return filenames.map((name) => path.join("/", eventImagesDir, name));
    },
};
