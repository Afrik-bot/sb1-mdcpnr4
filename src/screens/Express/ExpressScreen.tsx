import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import VideoPost from '../../components/VideoPost';

const { height } = Dimensions.get('window');

const SAMPLE_VIDEOS = [
  {
    id: '1',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    username: '@african_chef',
    description: 'Traditional cooking techniques 🍲',
    likes: 34200,
    comments: 892,
    shares: 445,
    isVerified: true,
  },
  {
    id: '2',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    username: '@dance_master',
    description: 'New Afrobeats dance challenge 💃🏾',
    likes: 89700,
    comments: 2300,
    shares: 1500,
    isVerified: true,
  },
];

export default function ExpressScreen() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const renderItem = ({ item, index }) => (
    <VideoPost
      video={item}
      isActive={index === activeVideoIndex}
    />
  );

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    if (viewableItems[0]) {
      setActiveVideoIndex(viewableItems[0].index);
    }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={SAMPLE_VIDEOS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});