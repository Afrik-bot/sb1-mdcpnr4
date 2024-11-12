import { connect, createLocalVideoTrack, Room, LocalTrack } from 'twilio-video';
import { auth } from '../lib/firebase';

const API_URL = 'https://api.tamtam.live';

interface TwilioToken {
  token: string;
  roomName: string;
}

export async function getStreamToken(streamId: string): Promise<TwilioToken> {
  const user = auth.currentUser;
  if (!user) throw new Error('Must be authenticated');

  const idToken = await user.getIdToken();
  const response = await fetch(`${API_URL}/twilio/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify({ streamId })
  });

  if (!response.ok) throw new Error('Failed to get stream token');
  return response.json();
}

export class TwilioService {
  private room: Room | null = null;
  private localTracks: LocalTrack[] = [];

  async joinStream(streamId: string): Promise<{
    room: Room;
    localTracks: LocalTrack[];
  }> {
    try {
      const { token, roomName } = await getStreamToken(streamId);

      // Create local video and audio tracks
      const localTracks = await Promise.all([
        createLocalVideoTrack(),
        // Create local audio track with noise cancellation
        navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          }
        }).then(stream => stream.getAudioTracks()[0])
      ]);

      // Connect to the room
      const room = await connect(token, {
        name: roomName,
        tracks: localTracks,
        dominantSpeaker: true,
        networkQuality: {
          local: 1,
          remote: 1
        },
        maxAudioBitrate: 16000,
        preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }]
      });

      this.room = room;
      this.localTracks = localTracks;

      return { room, localTracks };
    } catch (error) {
      console.error('Error joining stream:', error);
      throw error;
    }
  }

  async leaveStream() {
    try {
      // Stop all local tracks
      this.localTracks.forEach(track => track.stop());
      
      // Disconnect from the room
      if (this.room) {
        this.room.disconnect();
      }

      this.room = null;
      this.localTracks = [];
    } catch (error) {
      console.error('Error leaving stream:', error);
      throw error;
    }
  }

  toggleAudioEnabled(enabled: boolean) {
    const audioTrack = this.localTracks.find(track => track.kind === 'audio');
    if (audioTrack) {
      audioTrack.enable(enabled);
    }
  }

  toggleVideoEnabled(enabled: boolean) {
    const videoTrack = this.localTracks.find(track => track.kind === 'video');
    if (videoTrack) {
      videoTrack.enable(enabled);
    }
  }
}