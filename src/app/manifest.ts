import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Omagle - Random Video Chat",
		short_name: "Omagle",
		description:
			"Connect with random people worldwide through secure video chat",
		start_url: "/",
		display: "standalone",
		background_color: "#1a1a2e",
		theme_color: "#8b5cf6",
		icons: [
			// {
			//   src: "/icon-192x192.png",
			//   sizes: "192x192",
			//   type: "image/png",
			// },
			// {
			//   src: "/icon-512x512.png",
			//   sizes: "512x512",
			//   type: "image/png",
			// },
		],
	};
}
