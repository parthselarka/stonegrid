import { createClient } from "@supabase/supabase-js";

let supabaseSingleton;

export function getSupabaseAdmin() {
  if (supabaseSingleton) return supabaseSingleton;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  supabaseSingleton = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return supabaseSingleton;
}
