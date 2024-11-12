import { Stream, StreamAnalytics } from '../types/video';

const API_URL = 'https://api.tamtam.live';

export const createStream = async (streamData: Partial<Stream>): Promise<Stream> => {
  const response = await fetch(`${API_URL}/streams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(streamData),
  });
  if (!response.ok) throw new Error('Failed to create stream');
  return response.json();
};

export const startStream = async (streamId: string): Promise<Stream> => {
  const response = await fetch(`${API_URL}/streams/${streamId}/start`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to start stream');
  return response.json();
};

export const endStream = async (streamId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/streams/${streamId}/end`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to end stream');
};

export const getStreamAnalytics = async (streamId: string): Promise<StreamAnalytics> => {
  const response = await fetch(`${API_URL}/streams/${streamId}/analytics`);
  if (!response.ok) throw new Error('Failed to fetch stream analytics');
  return response.json();
};

export const updateStreamSettings = async (
  streamId: string,
  settings: Partial<Stream>
): Promise<Stream> => {
  const response = await fetch(`${API_URL}/streams/${streamId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error('Failed to update stream settings');
  return response.json();
};