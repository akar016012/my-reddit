// console.log(process.env.SUPABASE_KEY);
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pjcfoqaqvtguvgtryxrm.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
