"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Video, VideoOff, Mic, MicOff, PhoneOff, RotateCcw } from "lucide-react"

export function VideoChat() {
  const [isConnected, setIsConnected] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setStream(mediaStream)
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing media devices:", error)
    }
  }

  const findStranger = async () => {
    setIsSearching(true)
    await startVideo()

    // Simulate finding a stranger
    setTimeout(() => {
      setIsSearching(false)
      setIsConnected(true)
      // Simulate remote video (in real app, this would be WebRTC peer connection)
      if (remoteVideoRef.current) {
        remoteVideoRef.current.src = "/placeholder.svg?height=400&width=600"
      }
    }, 2000)
  }

  const disconnect = () => {
    setIsConnected(false)
    setIsSearching(false)
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.src = ""
    }
  }

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setVideoEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setAudioEnabled(audioTrack.enabled)
      }
    }
  }

  const nextStranger = () => {
    // Disconnect current and find new stranger
    disconnect()
    setTimeout(() => findStranger(), 500)
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="glass-effect rounded-2xl p-6 neon-glow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Remote Video */}
            <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
              {isConnected ? (
                <video ref={remoteVideoRef} className="video-element" autoPlay playsInline />
              ) : isSearching ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                    <p className="text-white">Looking for someone...</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Video className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Stranger's video will appear here</p>
                  </div>
                </div>
              )}
              {isConnected && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm">Connected</div>
              )}
            </div>

            {/* Local Video */}
            <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
              {stream ? (
                <video ref={localVideoRef} className="video-element" autoPlay playsInline muted />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Video className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Your video will appear here</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-4 left-4 bg-blue-500 text-white px-2 py-1 rounded text-sm">You</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isConnected && !isSearching ? (
              <Button
                onClick={findStranger}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold"
              >
                <Video className="h-5 w-5 mr-2" />
                Start Video Chat
              </Button>
            ) : (
              <>
                <Button
                  onClick={toggleVideo}
                  variant={videoEnabled ? "default" : "destructive"}
                  size="lg"
                  className="rounded-full"
                >
                  {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>

                <Button
                  onClick={toggleAudio}
                  variant={audioEnabled ? "default" : "destructive"}
                  size="lg"
                  className="rounded-full"
                >
                  {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>

                {isConnected && (
                  <Button
                    onClick={nextStranger}
                    variant="outline"
                    size="lg"
                    className="rounded-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Next
                  </Button>
                )}

                <Button onClick={disconnect} variant="destructive" size="lg" className="rounded-full">
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-300 text-sm">
              By using Omagle, you agree to our{" "}
              <a href="/terms" className="text-purple-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-purple-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
