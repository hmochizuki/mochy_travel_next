"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AuthButton({
	isSignedIn,
}: {
	isSignedIn: boolean;
}) {

	return isSignedIn ? (
		<div className="flex items-center gap-4">
			<form action={signOutAction}>
				<Button type="submit" variant={"outline"}>
					Sign out
				</Button>
			</form>
		</div>
	) : (
		<div className="flex gap-2">
			<Button asChild size="sm" variant={"outline"}>
				<Link href="/sign-in">Sign in</Link>
			</Button>
			<Button asChild size="sm" variant={"default"}>
				<Link href="/sign-up">Sign up</Link>
			</Button>
		</div>
	);
}
