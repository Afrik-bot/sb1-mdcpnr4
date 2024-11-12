import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const VIDEOS = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    username: '@african_chef',
    description: 'Traditional cooking techniques 🍲',
    likes: '34.2K',
    comments: '892',
    shares: '445',
  },
  // Add more videos here
];

export default function ExpressScreen() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: VIDEOS[currentVideo].url }}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted={isMuted}
      />

      <View style={styles.overlay}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{VIDEOS[currentVideo].username}</Text>
          <Text style={styles.description}>
            {VIDEOS[currentVideo].description}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="heart" size={30} color="#fff" />
            <Text style={styles.actionText}>{VIDEOS[currentVideo].likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="comment" size={30} color="#fff" />
            <Text style={styles.actionText}>{VIDEOS[currentVideo].comments}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="share" size={30} color="#fff" />
            <Text style={styles.actionText}>{VIDEOS[currentVideo].shares}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Icon 
              name={isMuted ? "volume-off" : "volume-high"} 
              size={30} 
              color="#fff" 
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width,
    height,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  userInfo: {
    flex: 1,
    marginRight: 20,
  },
  username: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#fff',
    fontSize: 14,
  },
  actions: {
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginVertical: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});