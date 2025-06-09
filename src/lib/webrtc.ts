export class WebRTCManager {
  private peerConnection: RTCPeerConnection | null = null
  private localStream: MediaStream | null = null
  private remoteStream: MediaStream | null = null
  private socket: any = null
  private partnerId: string | null = null

  private onRemoteStreamCallback?: (stream: MediaStream) => void
  private onConnectionStateCallback?: (state: string) => void
  private onDataChannelCallback?: (channel: RTCDataChannel) => void

  constructor() {
    this.initializePeerConnection()
  }

  private initializePeerConnection() {
    const configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
      ],
    }

    this.peerConnection = new RTCPeerConnection(configuration)

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.socket && this.partnerId) {
        this.socket.emit("ice-candidate", {
          candidate: event.candidate,
          to: this.partnerId,
        })
      }
    }

    this.peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0]
      if (this.onRemoteStreamCallback) {
        this.onRemoteStreamCallback(this.remoteStream)
      }
    }

    this.peerConnection.onconnectionstatechange = () => {
      if (this.onConnectionStateCallback && this.peerConnection) {
        this.onConnectionStateCallback(this.peerConnection.connectionState)
      }
    }
  }

  setSocket(socket: any) {
    this.socket = socket

    this.socket.on("offer", async ({ offer, from }: any) => {
      this.partnerId = from
      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(offer)
        const answer = await this.peerConnection.createAnswer()
        await this.peerConnection.setLocalDescription(answer)
        this.socket.emit("answer", { answer, to: from })
      }
    })

    this.socket.on("answer", async ({ answer }: any) => {
      if (this.peerConnection) {
        await this.peerConnection.setRemoteDescription(answer)
      }
    })

    this.socket.on("ice-candidate", async ({ candidate }: any) => {
      if (this.peerConnection) {
        await this.peerConnection.addIceCandidate(candidate)
      }
    })
  }

  async startLocalStream(): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      })

      if (this.peerConnection) {
        this.localStream.getTracks().forEach((track) => {
          this.peerConnection!.addTrack(track, this.localStream!)
        })
      }

      return this.localStream
    } catch (error) {
      console.error("Error accessing media devices:", error)
      throw error
    }
  }

  async createOffer(partnerId: string) {
    this.partnerId = partnerId
    if (this.peerConnection) {
      const offer = await this.peerConnection.createOffer()
      await this.peerConnection.setLocalDescription(offer)
      this.socket.emit("offer", { offer, to: partnerId })
    }
  }

  toggleVideo(): boolean {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        return videoTrack.enabled
      }
    }
    return false
  }

  toggleAudio(): boolean {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        return audioTrack.enabled
      }
    }
    return false
  }

  getConnectionQuality(): "excellent" | "good" | "poor" | "disconnected" {
    if (!this.peerConnection) return "disconnected"

    const state = this.peerConnection.connectionState
    switch (state) {
      case "connected":
        return "excellent"
      case "connecting":
        return "good"
      case "disconnected":
      case "failed":
        return "disconnected"
      default:
        return "poor"
    }
  }

  onRemoteStream(callback: (stream: MediaStream) => void) {
    this.onRemoteStreamCallback = callback
  }

  onConnectionState(callback: (state: string) => void) {
    this.onConnectionStateCallback = callback
  }

  // Only disconnect from stranger, keep local stream
  disconnectStranger() {
    if (this.peerConnection) {
      this.peerConnection.close()
      this.initializePeerConnection()

      // Re-add local stream to new peer connection
      if (this.localStream) {
        this.localStream.getTracks().forEach((track) => {
          this.peerConnection!.addTrack(track, this.localStream!)
        })
      }

      // Re-set socket handlers
      if (this.socket) {
        this.setSocket(this.socket)
      }
    }

    if (this.socket && this.partnerId) {
      this.socket.emit("disconnect-stranger")
    }

    this.partnerId = null
    this.remoteStream = null
  }

  // Full disconnect including local stream
  disconnect() {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop())
      this.localStream = null
    }

    if (this.peerConnection) {
      this.peerConnection.close()
      this.initializePeerConnection()
    }

    if (this.socket && this.partnerId) {
      this.socket.emit("disconnect-stranger")
    }

    this.partnerId = null
    this.remoteStream = null
  }

  getLocalStream(): MediaStream | null {
    return this.localStream
  }

  getRemoteStream(): MediaStream | null {
    return this.remoteStream
  }

  getPartnerId(): string | null {
    return this.partnerId
  }
}
