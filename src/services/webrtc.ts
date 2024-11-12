import { getFirestore, collection, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../lib/firebase';

const db = getFirestore();
const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
};

export class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private streamId: string | null = null;
  private onStreamUpdate: ((stream: MediaStream) => void) | null = null;

  async initializeStream(streamId: string, onStreamUpdate: (stream: MediaStream) => void) {
    this.streamId = streamId;
    this.onStreamUpdate = onStreamUpdate;

    try {
      // Get user media permissions
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // Create peer connection
      this.peerConnection = new RTCPeerConnection(servers);

      // Add local tracks to peer connection
      this.localStream.getTracks().forEach((track) => {
        if (this.peerConnection && this.localStream) {
          this.peerConnection.addTrack(track, this.localStream);
        }
      });

      // Handle remote stream
      this.peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          if (this.remoteStream) {
            this.remoteStream.addTrack(track);
          }
        });
      };

      // Handle ICE candidates
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.updateStreamDoc({
            candidates: [...(this.getStreamDoc()?.candidates || []), event.candidate.toJSON()],
          });
        }
      };

      // Listen for remote session description
      this.listenToStreamDoc();

      // Create and set local session description
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      await this.updateStreamDoc({
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      });

      onStreamUpdate(this.localStream);
    } catch (error) {
      console.error('Error initializing stream:', error);
      throw error;
    }
  }

  private async listenToStreamDoc() {
    if (!this.streamId) return;

    const streamRef = doc(collection(db, 'streams'), this.streamId);
    onSnapshot(streamRef, async (snapshot) => {
      const data = snapshot.data();
      if (!data) return;

      // Handle answer
      if (data.answer && !this.peerConnection?.currentRemoteDescription) {
        const answerDescription = new RTCSessionDescription(data.answer);
        await this.peerConnection?.setRemoteDescription(answerDescription);
      }

      // Handle ICE candidates
      if (data.candidates) {
        try {
          data.candidates.forEach(async (candidate: RTCIceCandidateInit) => {
            if (this.peerConnection?.remoteDescription) {
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            }
          });
        } catch (error) {
          console.error('Error adding received ICE candidate:', error);
        }
      }
    });
  }

  private async updateStreamDoc(data: any) {
    if (!this.streamId) return;

    const streamRef = doc(collection(db, 'streams'), this.streamId);
    await updateDoc(streamRef, data);
  }

  private getStreamDoc() {
    if (!this.streamId) return null;

    const streamRef = doc(collection(db, 'streams'), this.streamId);
    return streamRef;
  }

  async stopStream() {
    this.localStream?.getTracks().forEach(track => track.stop());
    this.peerConnection?.close();
    this.localStream = null;
    this.remoteStream = null;
    this.peerConnection = null;

    if (this.streamId) {
      await this.updateStreamDoc({
        status: 'ended',
        endedAt: new Date().toISOString(),
      });
    }
  }

  async toggleAudio(enabled: boolean) {
    this.localStream?.getAudioTracks().forEach(track => {
      track.enabled = enabled;
    });
  }

  async toggleVideo(enabled: boolean) {
    this.localStream?.getVideoTracks().forEach(track => {
      track.enabled = enabled;
    });
  }
}