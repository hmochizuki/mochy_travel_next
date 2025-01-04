import type { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database, "public", Database["public"]>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        },
      },
    },
  );
};

export const setAuthCookies = async (cookiesToSet: Array<{ name: string; value: string; options?: any }>) => {
  const cookieStore = await cookies();

  for (const { name, value, options } of cookiesToSet) {
    cookieStore.set(name, value, options);
  }
};
