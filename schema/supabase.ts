import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Check your .env file, Supabase credentials are missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// get all tables
export const USER_TABLE = "Users";
export const EVENT_TABLE = "Events";
export const SUBMISSION_TABLE = "Submissions";
