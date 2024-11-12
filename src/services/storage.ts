import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { auth } from '../lib/firebase';

const storage = getStorage();
const db = getFirestore();

export async function uploadVideo(file: File, metadata: { title: string; description?: string }) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User must be authenticated');

    // Create a unique filename
    const filename = `videos/${user.uid}/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, filename);

    // Upload the video
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Save video metadata to Firestore
    const videoDoc = await addDoc(collection(db, 'videos'), {
      userId: user.uid,
      username: user.email?.split('@')[0] || 'Anonymous',
      url: downloadURL,
      filename,
      title: metadata.title,
      description: metadata.description,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    });

    return videoDoc.id;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
}

export async function getVideos(limit = 10) {
  try {
    const videosQuery = query(
      collection(db, 'videos'),
      orderBy('createdAt', 'desc'),
      limit(limit)
    );

    const snapshot = await getDocs(videosQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

export async function deleteVideo(videoId: string) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('User must be authenticated');

    await fetch(`/api/videos/${videoId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${await user.getIdToken()}`
      }
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
}