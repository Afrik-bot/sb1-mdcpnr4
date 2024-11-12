import { useEffect, useRef, useState } from 'react';
import { Room, RemoteParticipant, LocalTrack } from 'twilio-video';
import { TwilioService } from '../../services/twilio';
import StreamControls from './StreamControls';

interface TwilioStreamProps {
  streamId: string;
  onEndStream: () => void;
}

export default function TwilioStream({ streamId, onEndStream }: TwilioStreamProps) {
  const [twilioService] = useState(new TwilioService());
  const [error, setError] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [participants, setParticipants] = useState<RemoteParticipant[]>([]);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeStream = async () => {
      try {
        const { room, localTracks } = await twilioService.joinStream(streamId);

        // Handle local video
        const videoTrack = localTracks.find(track => track.kind === 'video') as LocalTrack;
        if (videoTrack && localVideoRef.current) {
          const element = videoTrack.attach();
          localVideoRef.current.appendChild(element);
        }

        // Handle participants
        const participantConnected = (participant: RemoteParticipant) => {
          setParticipants(prevParticipants => [...prevParticipants, participant]);
          
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed && remoteVideoRef.current) {
              const element = publication.track.attach();
              remoteVideoRef.current.appendChild(element);
            }
          });
        };

        const participantDisconnected = (participant: RemoteParticipant) => {
          setParticipants(prevParticipants => 
            prevParticipants.filter(p => p !== participant)
          );
        };

        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        
        // Add existing participants
        room.participants.forEach(participantConnected);

        setIsInitializing(false);

        return () => {
          room.off('participantConnected', participantConnected);
          room.off('participantDisconnected', participantDisconnected);
        };
      } catch (err: any) {
        console.error('Failed to initialize stream:', err);
        setError(err.message || 'Failed to start stream');
        setIsInitializing(false);
      }
    };

    initializeStream();

    return () => {
      twilioService.leaveStream();
    };
  }, [streamId, twilioService]);

  const handleEndStream = async () => {
    try {
      await twilioService.leaveStream();
      onEndStream();
    } catch (err) {
      console.error('Error ending stream:', err);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 rounded-lg p-6">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={onEndStream}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 rounded-lg">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Initializing stream...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="grid grid-cols-2 gap-4 p-4">
        <div ref={localVideoRef} className="aspect-video bg-gray-800 rounded-lg overflow-hidden" />
        <div ref={remoteVideoRef} className="aspect-video bg-gray-800 rounded-lg overflow-hidden" />
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-lg text-white">
          {participants.length} viewer{participants.length !== 1 ? 's' : ''}
        </div>
      </div>

      <StreamControls
        onToggleVideo={(enabled) => twilioService.toggleVideoEnabled(enabled)}
        onToggleAudio={(enabled) => twilioService.toggleAudioEnabled(enabled)}
        onEndStream={handleEndStream}
      />
    </div>
  );
}