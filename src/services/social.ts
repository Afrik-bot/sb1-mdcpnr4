import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../lib/firebase';

const db = getFirestore();

export async function followUser(userId: string) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Must be logged in to follow users');

    await addDoc(collection(db, 'follows'), {
      followerId: currentUser.uid,
      followingId: userId,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
}

export async function unfollowUser(userId: string) {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error('Must be logged in to unfollow users');

    const followsQuery = query(
      collection(db, 'follows'),
      where('followerId', '==', currentUser.uid),
      where('followingId', '==', userId)
    );

    const snapshot = await getDocs(followsQuery);
    const followDoc = snapshot.docs[0];
    
    if (followDoc) {
      await updateDoc(doc(db, 'follows', followDoc.id), {
        unfollowedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
}

export async function getFollowers(userId: string) {
  try {
    const followersQuery = query(
      collection(db, 'follows'),
      where('followingId', '==', userId),
      where('unfollowedAt', '==', null)
    );

    const snapshot = await getDocs(followersQuery);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error getting followers:', error);
    throw error;
  }
}

export async function getFollowing(userId: string) {
  try {
    const followingQuery = query(
      collection(db, 'follows'),
      where('followerId', '==', userId),
      where('unfollowedAt', '==', null)
    );

    const snapshot = await getDocs(followingQuery);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error getting following:', error);
    throw error;
  }
}