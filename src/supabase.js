// console.log(process.env.SUPABASE_KEY);
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPA_KEY;
const supabaseKey = process.env.SUPA_URL;
export const supabase = createClient(supabaseUrl, supabaseKey);
