import type { Database } from "@/types/supabase";
import { createBrowserClient } from "@supabase/ssr";

export const createClient = () =>
	createBrowserClient<Database, "public">(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);
