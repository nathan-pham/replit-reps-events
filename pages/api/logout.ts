import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "cookies";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = new Cookies(req, res);
    cookies.set("token");
    res.redirect("/");
}
