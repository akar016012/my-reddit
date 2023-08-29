// console.log(process.env.SUPABASE_KEY);
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pjcfoqaqvtguvgtryxrm.supabase.co";

const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
export const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqY2ZvcWFxdnRndXZndHJ5eHJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2MDYwMzcsImV4cCI6MjAwMzE4MjAzN30.6W9OPh1euJxUwwjthAGNQnOM8LNW_nRAro8dThnjO8w"
);
