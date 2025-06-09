import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ConditionalFooter } from "@/components/conditional-footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "ChatVibe - Random Video Chat with Strangers",
	description:
		"Connect with random people worldwide through secure video chat and messaging. Meet new friends and have meaningful conversations on ChatVibe.",
	keywords:
		"video chat, random chat, meet strangers, online chat, webcam chat, social platform",
	authors: [{ name: "ChatVibe Team" }],
	creator: "ChatVibe",
	publisher: "ChatVibe",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://chatvibe.com"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: "ChatVibe - Random Video Chat with Strangers",
		description:
			"Connect with random people worldwide through secure video chat.",
		url: "https://chatvibe.com",
		siteName: "ChatVibe",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "ChatVibe - Random Video Chat",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "ChatVibe - Random Video Chat with Strangers",
		description:
			"Connect with random people worldwide through secure video chat.",
		images: ["/og-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className} suppressHydrationWarning>
				<div className='min-h-screen bg-white'>
					<Navigation />
					<main>{children}</main>
					<ConditionalFooter />
				</div>
			</body>
		</html>
	);
}
