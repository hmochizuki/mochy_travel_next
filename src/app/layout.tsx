import HeaderAuth from "@/components/header-auth";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "mochy travel",
	description: "旅のしおりを作るアプリ",
};

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang="en" className={geistSans.className} suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="min-h-screen flex flex-col items-center">
						<div className="flex-1 w-full flex flex-col gap-2 items-center">
							<nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
								<div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
									<div className="flex gap-5 items-center font-semibold">
										{/* TODO: リンクにする */}
										{/* <Link href={ user ? "/protected" : "/"}>mochy travel</Link> */}
									</div>
									<HeaderAuth isSignedIn={false} />
								</div>
							</nav>
							<div className="flex flex-col gap-2 max-w-5xl p-5">
								{children}
							</div>
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
