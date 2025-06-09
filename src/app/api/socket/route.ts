import type { NextRequest } from "next/server";
import { Server } from "socket.io";

const ioHandler = (req: NextRequest, res: any) => {
	if (!res.socket.server.io) {
		console.log("Setting up Socket.IO server...");

		const io = new Server(res.socket.server, {
			path: "/api/socket",
			addTrailingSlash: false,
			cors: {
				origin: "*",
				methods: ["GET", "POST"],
			},
		});

		// Store waiting users
		const waitingUsers: string[] = [];
		const connectedPairs = new Map<string, string>();

		io.on("connection", (socket) => {
			console.log("User connected:", socket.id);

			socket.on("find-stranger", () => {
				if (waitingUsers.length > 0) {
					// Match with waiting user
					const partnerId = waitingUsers.shift()!;
					connectedPairs.set(socket.id, partnerId);
					connectedPairs.set(partnerId, socket.id);

					// Notify both users
					socket.emit("stranger-found", { partnerId });
					socket
						.to(partnerId)
						.emit("stranger-found", { partnerId: socket.id });
				} else {
					// Add to waiting list
					waitingUsers.push(socket.id);
					socket.emit("searching");
				}
			});

			socket.on("offer", ({ offer, to }) => {
				socket.to(to).emit("offer", { offer, from: socket.id });
			});

			socket.on("answer", ({ answer, to }) => {
				socket.to(to).emit("answer", { answer, from: socket.id });
			});

			socket.on("ice-candidate", ({ candidate, to }) => {
				socket
					.to(to)
					.emit("ice-candidate", { candidate, from: socket.id });
			});

			socket.on("message", ({ message, to }) => {
				socket.to(to).emit("message", { message, from: socket.id });
			});

			socket.on("typing", ({ to, isTyping }) => {
				socket.to(to).emit("typing", { isTyping, from: socket.id });
			});

			socket.on("disconnect-stranger", () => {
				const partnerId = connectedPairs.get(socket.id);
				if (partnerId) {
					socket.to(partnerId).emit("stranger-disconnected");
					connectedPairs.delete(socket.id);
					connectedPairs.delete(partnerId);
				}
			});

			socket.on("disconnect", () => {
				console.log("User disconnected:", socket.id);

				// Remove from waiting list
				const waitingIndex = waitingUsers.indexOf(socket.id);
				if (waitingIndex > -1) {
					waitingUsers.splice(waitingIndex, 1);
				}

				// Notify partner if connected
				const partnerId = connectedPairs.get(socket.id);
				if (partnerId) {
					socket.to(partnerId).emit("stranger-disconnected");
					connectedPairs.delete(socket.id);
					connectedPairs.delete(partnerId);
				}
			});
		});

		res.socket.server.io = io;
	}
	res.end();
};

export { ioHandler as GET, ioHandler as POST };
