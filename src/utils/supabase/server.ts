import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
				async setAll(cookies) {
					try {
						for (const { name, value, options } of cookies) {
							await setAuthCookies([{ name, value, options }]);
						}
					} catch (error) {
						// The `set` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
						console.error(error);
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
