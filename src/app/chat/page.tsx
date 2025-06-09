import type { Metadata } from "next"
import { VideoChat } from "@/components/video-chat-page"

export const metadata: Metadata = {
  title: "Video Chat - ChatVibe | Connect with Strangers",
  description: "Start your video chat session and connect with random people worldwide.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function ChatPage() {
  return (
    <div className="min-h-screen">
      <VideoChat />
    </div>
  )
}
