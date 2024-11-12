import { useEffect, useRef } from 'react';
import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore';

interface StreamViewerProps {
  streamId: string;
  onError: (error: string) => void;
}

export default function StreamViewer({ streamId, onError }: StreamViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const servers = {
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
    };

    const db = getFirestore();
    const streamRef = doc(collection(db, 'streams'), streamId);

    const setupPeerConnection = async () => {
      try {
        const peerConnection = new RTCPeerConnection(servers);
        peerConnectionRef.current = peerConnection;

        // Handle incoming tracks
        peerConnection.ontrack = (event) => {
          if (videoRef.current) {
            videoRef.current.srcObject = event.streams[0];
          }
        };

        // Listen for stream data changes
        const unsubscribe = onSnapshot(streamRef, async (snapshot) => {
          const data = snapshot.data();
          if (!data) return;

          try {
            if (data.offer && !peerConnection.currentRemoteDescription) {
              await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
              const answer = await peerConnection.createAnswer();
              await peerConnection.setLocalDescription(answer);

              await streamRef.update({
                answer: {
                  type: answer.type,
                  sdp: answer.sdp,
                },
              });
            }

            if (data.candidates) {
              try {
                data.candidates.forEach(async (candidate: RTCIceCandidateInit) => {
                  if (peerConnection.remoteDescription) {
                    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                  }
                });
              } catch (error) {
                console.error('Error adding received ICE candidate:', error);
              }
            }
          } catch (error) {
            console.error('Error handling stream data:', error);
            onError('Failed to connect to stream');
          }
        });

        return () => {
          unsubscribe();
          peerConnection.close();
        };
      } catch (error) {
        console.error('Error setting up peer connection:', error);
        onError('Failed to initialize stream viewer');
      }
    };

    setupPeerConnection();

    return () => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [streamId, onError]);

  return (
    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}