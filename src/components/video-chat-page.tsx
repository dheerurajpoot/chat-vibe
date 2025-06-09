"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
	Video,
	VideoOff,
	Mic,
	MicOff,
	PhoneOff,
	Send,
	Flag,
	Wifi,
	WifiOff,
	Signal,
	AlertCircle,
	Shuffle,
	Users,
} from "lucide-react";
import { WebRTCManager } from "@/lib/webrtc";
import { io, type Socket } from "socket.io-client";

interface Message {
	id: string;
	text: string;
	sender: "you" | "stranger";
	timestamp: Date;
}

type ConnectionState =
	| "disconnected"
	| "searching"
	| "connecting"
	| "connected";
type ConnectionQuality = "excellent" | "good" | "poor" | "disconnected";

export function VideoChat() {
	const [connectionState, setConnectionState] =
		useState<ConnectionState>("disconnected");
	const [connectionQuality, setConnectionQuality] =
		useState<ConnectionQuality>("disconnected");
	const [videoEnabled, setVideoEnabled] = useState(true);
	const [audioEnabled, setAudioEnabled] = useState(true);
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [strangerTyping, setStrangerTyping] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [onlineUsers, setOnlineUsers] = useState(0);
	const [localStreamReady, setLocalStreamReady] = useState(false);

	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRef = useRef<HTMLVideoElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const webrtcManager = useRef<WebRTCManager | null>(null);
	const socket = useRef<Socket | null>(null);
	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		initializeSocket();
		initializeWebRTC();
		// Simulate online users
		setOnlineUsers(Math.floor(Math.random() * 1000) + 500);

		return () => {
			cleanup();
		};
	}, []);

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [messages]);

	const initializeSocket = useCallback(() => {
		socket.current = io({
			path: "/api/socket",
		});

		socket.current.on("connect", () => {
			console.log("Connected to server");
		});

		socket.current.on("searching", () => {
			setConnectionState("searching");
		});

		socket.current.on("stranger-found", async ({ partnerId }) => {
			setConnectionState("connecting");
			if (webrtcManager.current) {
				await webrtcManager.current.createOffer(partnerId);
			}
		});

		socket.current.on("message", ({ message }) => {
			const newMsg: Message = {
				id: Date.now().toString(),
				text: message,
				sender: "stranger",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, newMsg]);
		});

		socket.current.on("typing", ({ isTyping }) => {
			setStrangerTyping(isTyping);
		});

		socket.current.on("stranger-disconnected", () => {
			handleStrangerDisconnect();
			addSystemMessage("Stranger disconnected");
		});

		socket.current.on("disconnect", () => {
			setConnectionState("disconnected");
			setError("Connection lost. Please try again.");
		});
	}, []);

	const initializeWebRTC = useCallback(() => {
		webrtcManager.current = new WebRTCManager();

		webrtcManager.current.onRemoteStream((stream) => {
			if (remoteVideoRef.current) {
				remoteVideoRef.current.srcObject = stream;
			}
			setConnectionState("connected");
		});

		webrtcManager.current.onConnectionState((state) => {
			console.log("Connection state:", state);
			updateConnectionQuality();
		});

		if (socket.current) {
			webrtcManager.current.setSocket(socket.current);
		}
	}, []);

	const updateConnectionQuality = useCallback(() => {
		if (webrtcManager.current) {
			const quality = webrtcManager.current.getConnectionQuality();
			setConnectionQuality(quality);
		}
	}, []);

	const startVideo = async () => {
		try {
			setError(null);
			if (webrtcManager.current && !localStreamReady) {
				const stream = await webrtcManager.current.startLocalStream();
				if (localVideoRef.current) {
					localVideoRef.current.srcObject = stream;
				}
				setLocalStreamReady(true);
			}
		} catch (error) {
			console.error("Error accessing media devices:", error);
			setError(
				"Unable to access camera/microphone. Please check permissions."
			);
		}
	};

	const findStranger = async () => {
		try {
			setError(null);
			await startVideo();
			if (socket.current) {
				socket.current.emit("find-stranger");
				setConnectionState("searching");
				addSystemMessage("Looking for someone to chat with...");
			}
		} catch (error) {
			setError("Failed to start video chat. Please try again.");
		}
	};

	const handleStrangerDisconnect = () => {
		// Only disconnect from stranger, keep local video running
		if (webrtcManager.current) {
			webrtcManager.current.disconnectStranger();
		}
		setConnectionState("disconnected");
		setMessages([]);
		setStrangerTyping(false);
		if (remoteVideoRef.current) {
			remoteVideoRef.current.srcObject = null;
		}
		// Keep local video running
	};

	const handleFullDisconnect = () => {
		if (webrtcManager.current) {
			webrtcManager.current.disconnect();
		}
		setConnectionState("disconnected");
		setMessages([]);
		setStrangerTyping(false);
		setLocalStreamReady(false);
		if (localVideoRef.current) {
			localVideoRef.current.srcObject = null;
		}
		if (remoteVideoRef.current) {
			remoteVideoRef.current.srcObject = null;
		}
	};

	const toggleVideo = () => {
		if (webrtcManager.current) {
			const enabled = webrtcManager.current.toggleVideo();
			setVideoEnabled(enabled);
		}
	};

	const toggleAudio = () => {
		if (webrtcManager.current) {
			const enabled = webrtcManager.current.toggleAudio();
			setAudioEnabled(enabled);
		}
	};

	const swapStranger = () => {
		// Only disconnect from current stranger and find new one
		handleStrangerDisconnect();
		setTimeout(() => {
			if (socket.current) {
				socket.current.emit("find-stranger");
				setConnectionState("searching");
				addSystemMessage("Looking for someone new...");
			}
		}, 500);
	};

	const sendMessage = () => {
		if (
			newMessage.trim() &&
			connectionState === "connected" &&
			socket.current
		) {
			const message: Message = {
				id: Date.now().toString(),
				text: newMessage.trim(),
				sender: "you",
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, message]);

			const partnerId = webrtcManager.current?.getPartnerId();
			if (partnerId) {
				socket.current.emit("message", {
					message: newMessage.trim(),
					to: partnerId,
				});
			}

			setNewMessage("");
		}
	};

	const handleTyping = (isTyping: boolean) => {
		if (socket.current && connectionState === "connected") {
			const partnerId = webrtcManager.current?.getPartnerId();
			if (partnerId) {
				socket.current.emit("typing", { to: partnerId, isTyping });
			}
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewMessage(e.target.value);

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}

		handleTyping(true);

		typingTimeoutRef.current = setTimeout(() => {
			handleTyping(false);
		}, 1000);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const addSystemMessage = (text: string) => {
		const message: Message = {
			id: Date.now().toString(),
			text,
			sender: "stranger",
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, message]);
	};

	const cleanup = () => {
		if (webrtcManager.current) {
			webrtcManager.current.disconnect();
		}
		if (socket.current) {
			socket.current.disconnect();
		}
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}
	};

	const getConnectionIcon = () => {
		switch (connectionQuality) {
			case "excellent":
				return <Signal className='h-4 w-4 text-green-500' />;
			case "good":
				return <Wifi className='h-4 w-4 text-yellow-500' />;
			case "poor":
				return <WifiOff className='h-4 w-4 text-red-500' />;
			default:
				return <WifiOff className='h-4 w-4 text-gray-400' />;
		}
	};

	const getStatusText = () => {
		switch (connectionState) {
			case "searching":
				return "Looking for someone...";
			case "connecting":
				return "Connecting...";
			case "connected":
				return "Connected";
			default:
				return "Disconnected";
		}
	};

	return (
		<div className='h-screen bg-gradient-to-br from-pink-50 to-rose-50 overflow-hidden'>
			<div className='h-full flex flex-col'>
				{/* Header */}
				<div className='glass-effect p-4 border-b border-pink-200'>
					<div className='max-w-7xl mx-auto flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							<div className='connection-indicator'>
								{getConnectionIcon()}
								<span className='font-medium text-gray-800'>
									{getStatusText()}
								</span>
							</div>
							{connectionState === "connected" && (
								<div className='text-sm text-gray-700'>
									Quality:{" "}
									<span
										className={`font-medium connection-${connectionQuality}`}>
										{connectionQuality
											.charAt(0)
											.toUpperCase() +
											connectionQuality.slice(1)}
									</span>
								</div>
							)}
						</div>
						<div className='flex items-center space-x-4'>
							<div className='flex items-center space-x-2 text-sm text-gray-700'>
								<Users className='h-4 w-4 text-pink-500' />
								<span className='font-medium'>
									{onlineUsers} online
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Error Message */}
				{error && (
					<div className='bg-red-50 border-b border-red-200 p-3'>
						<div className='max-w-7xl mx-auto flex items-center space-x-2'>
							<AlertCircle className='h-5 w-5 text-red-500' />
							<span className='text-red-700 font-medium'>
								{error}
							</span>
						</div>
					</div>
				)}

				{/* Main Chat Interface */}
				<div className='flex-1 overflow-hidden'>
					<div className='max-w-7xl mx-auto h-full p-4'>
						<div className='grid grid-cols-1 lg:grid-cols-4 gap-4 h-full'>
							{/* Video Section */}
							<div className='lg:col-span-3 flex flex-col space-y-4 h-full'>
								{/* Remote Video */}
								<div className='flex-1 bg-gray-100 rounded-lg relative overflow-hidden border-2 border-pink-200 min-h-0'>
									{connectionState === "connected" ? (
										<video
											ref={remoteVideoRef}
											className='w-full h-full object-cover'
											autoPlay
											playsInline
										/>
									) : connectionState === "searching" ? (
										<div className='flex items-center justify-center h-full'>
											<div className='text-center'>
												<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4'></div>
												<p className='text-gray-700 font-medium'>
													Looking for someone...
												</p>
												<p className='text-gray-600 text-sm mt-2'>
													This may take a few moments
												</p>
											</div>
										</div>
									) : connectionState === "connecting" ? (
										<div className='flex items-center justify-center h-full'>
											<div className='text-center'>
												<div className='pulse-animation'>
													<Video className='h-16 w-16 text-pink-500 mx-auto mb-4' />
												</div>
												<p className='text-gray-700 font-medium'>
													Connecting...
												</p>
											</div>
										</div>
									) : (
										<div className='flex items-center justify-center h-full'>
											<div className='text-center'>
												<Video className='h-16 w-16 text-gray-400 mx-auto mb-4' />
												<p className='text-gray-600'>
													Stranger's video will appear
													here
												</p>
											</div>
										</div>
									)}

									{connectionState === "connected" && (
										<>
											<div className='absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1'>
												<div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
												<span>Live</span>
											</div>
											<Button
												size='sm'
												variant='destructive'
												className='absolute top-4 right-4 rounded-full'
												title='Report user'>
												<Flag className='h-4 w-4' />
											</Button>
										</>
									)}
								</div>

								{/* Local Video */}
								<div className='flex-1 bg-gray-100 rounded-lg relative overflow-hidden border-2 border-pink-200'>
									{localStreamReady ? (
										<video
											ref={localVideoRef}
											className='w-full h-full object-cover'
											autoPlay
											playsInline
											muted
										/>
									) : (
										<div className='flex items-center justify-center h-full'>
											<div className='text-center'>
												<Video className='h-8 w-8 text-gray-400 mx-auto mb-2' />
												<p className='text-gray-600 text-sm'>
													Your video
												</p>
											</div>
										</div>
									)}
									<div className='absolute bottom-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
										You
									</div>
									{!videoEnabled && localStreamReady && (
										<div className='absolute inset-0 bg-gray-900 flex items-center justify-center'>
											<VideoOff className='h-8 w-8 text-white' />
										</div>
									)}
								</div>

								{/* Controls */}
								<div className='flex justify-center space-x-3'>
									{connectionState === "disconnected" &&
									!localStreamReady ? (
										<Button
											onClick={findStranger}
											size='lg'
											className='bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full font-semibold'>
											<Video className='h-5 w-5 mr-2' />
											Find Someone Special
										</Button>
									) : (
										<>
											<Button
												onClick={toggleVideo}
												variant={
													videoEnabled
														? "default"
														: "destructive"
												}
												size='lg'
												className='rounded-full'>
												{videoEnabled ? (
													<Video className='h-5 w-5' />
												) : (
													<VideoOff className='h-5 w-5' />
												)}
											</Button>

											<Button
												onClick={toggleAudio}
												variant={
													audioEnabled
														? "default"
														: "destructive"
												}
												size='lg'
												className='rounded-full'>
												{audioEnabled ? (
													<Mic className='h-5 w-5' />
												) : (
													<MicOff className='h-5 w-5' />
												)}
											</Button>

											{connectionState ===
												"disconnected" &&
												localStreamReady && (
													<Button
														onClick={findStranger}
														size='lg'
														className='bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full'>
														<Video className='h-5 w-5 mr-2' />
														Start
													</Button>
												)}

											{(connectionState === "connected" ||
												connectionState ===
													"searching" ||
												connectionState ===
													"connecting") && (
												<Button
													onClick={swapStranger}
													size='lg'
													className='swap-button rounded-full'>
													<Shuffle className='h-5 w-5 mr-2' />
													Swap
												</Button>
											)}

											<Button
												onClick={handleFullDisconnect}
												variant='destructive'
												size='lg'
												className='rounded-full'>
												<PhoneOff className='h-5 w-5' />
											</Button>
										</>
									)}
								</div>
							</div>

							{/* Chat Section */}
							<div className='flex flex-col bg-white/90 rounded-lg border border-pink-200 h-full'>
								<div className='p-4 border-b border-pink-200 bg-gradient-to-r from-pink-50 to-rose-50'>
									<h3 className='text-gray-800 font-semibold flex items-center gap-2'>
										💬 Chat
										{connectionState === "connected" && (
											<span className='text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full'>
												Online
											</span>
										)}
									</h3>
								</div>

								{/* Messages */}
								<div
									ref={chatContainerRef}
									className='flex-1 p-4 chat-container space-y-3 min-h-0'>
									{messages.length === 0 &&
										connectionState === "disconnected" && (
											<div className='text-center text-gray-500 mt-8'>
												<p>
													Connect with someone to
													start chatting
												</p>
											</div>
										)}
									{messages.map((message) => (
										<div
											key={message.id}
											className={`chat-message ${
												message.sender === "you"
													? "own"
													: "other"
											}`}>
											<p className='text-sm'>
												{message.text}
											</p>
											<p className='text-xs opacity-70 mt-1'>
												{message.timestamp.toLocaleTimeString(
													[],
													{
														hour: "2-digit",
														minute: "2-digit",
													}
												)}
											</p>
										</div>
									))}
									{strangerTyping && (
										<div className='typing-indicator'>
											<div className='typing-dot'></div>
											<div className='typing-dot'></div>
											<div className='typing-dot'></div>
											<span className='text-xs text-gray-500 ml-2'>
												typing...
											</span>
										</div>
									)}
								</div>

								{/* Message Input */}
								<div className='p-4 border-t border-pink-200'>
									<div className='flex space-x-2'>
										<input
											type='text'
											value={newMessage}
											onChange={handleInputChange}
											onKeyPress={handleKeyPress}
											placeholder={
												connectionState === "connected"
													? "Type a message..."
													: "Connect to start chatting"
											}
											disabled={
												connectionState !== "connected"
											}
											className='flex-1 px-3 py-2 bg-white border border-pink-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent disabled:opacity-50'
										/>
										<Button
											onClick={sendMessage}
											disabled={
												connectionState !==
													"connected" ||
												!newMessage.trim()
											}
											size='sm'
											className='bg-pink-500 hover:bg-pink-600 text-white rounded-lg'>
											<Send className='h-4 w-4' />
										</Button>
									</div>
									<p className='text-xs text-gray-600 mt-2'>
										Press Enter to send • Be respectful and
										kind ❤️
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
