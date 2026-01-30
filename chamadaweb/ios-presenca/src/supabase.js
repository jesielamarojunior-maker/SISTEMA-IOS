import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_KEY = "SUA-CHAVE-ANON";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
