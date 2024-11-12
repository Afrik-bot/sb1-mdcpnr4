import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../theme/colors';

const FRIENDS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    isOnline: true,
    lastSeen: 'now',
  },
  {
    id: '2',
    name: 'David Okafor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    isOnline: true,
    lastSeen: 'now',
  },
  {
    id: '3',
    name: 'Amina Mohammed',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amina',
    isOnline: false,
    lastSeen: '2h ago',
  },
];

const COMMUNITIES = [
  {
    id: '1',
    name: 'African Tech Hub',
    members: '12.4K',
    description: 'A community for African tech enthusiasts and professionals',
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=tech',
  },
  {
    id: '2',
    name: 'Afrobeats Connect',
    members: '45.2K',
    description: 'Share and discover African music',
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=music',
  },
  {
    id: '3',
    name: 'African Cuisine',
    members: '28.7K',
    description: 'Explore traditional and modern African recipes',
    image: 'https://api.dicebear.com/7.x/identicon/svg?seed=food',
  },
];

export default function ConnectScreen() {
  const [activeTab, setActiveTab] = useState<'friends' | 'communities'>('friends');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="magnify" size={24} color={colors.text.primary} />
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
            Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'communities' && styles.activeTab]}
          onPress={() => setActiveTab('communities')}
        >
          <Text style={[styles.tabText, activeTab === 'communities' && styles.activeTabText]}>
            Communities
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'friends' ? (
          <View style={styles.friendsList}>
            {FRIENDS.map(friend => (
              <TouchableOpacity key={friend.id} style={styles.friendItem}>
                <View style={styles.friendInfo}>
                  <Image source={{ uri: friend.avatar }} style={styles.avatar} />
                  <View>
                    <Text style={styles.name}>{friend.name}</Text>
                    <Text style={[
                      styles.status,
                      friend.isOnline ? styles.online : styles.offline
                    ]}>
                      {friend.isOnline ? 'Online' : friend.lastSeen}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.messageButton}>
                  <Icon name="chat" size={24} color={colors.primary} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.communitiesList}>
            {COMMUNITIES.map(community => (
              <TouchableOpacity key={community.id} style={styles.communityItem}>
                <Image source={{ uri: community.image }} style={styles.communityImage} />
                <View style={styles.communityInfo}>
                  <Text style={styles.communityName}>{community.name}</Text>
                  <Text style={styles.communityMembers}>{community.members} members</Text>
                  <Text style={styles.communityDescription}>{community.description}</Text>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchText: {
    color: colors.text.secondary,
    fontSize: 16,
  },
  tabs: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.text.primary,
  },
  content: {
    flex: 1,
  },
  friendsList: {
    padding: 16,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
  },
  name: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
  },
  online: {
    color: '#22C55E',
  },
  offline: {
    color: colors.text.secondary,
  },
  messageButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  communitiesList: {
    padding: 16,
  },
  communityItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  communityImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.primary,
  },
  communityInfo: {
    padding: 16,
  },
  communityName: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  communityMembers: {
    color: colors.text.secondary,
    fontSize: 14,
    marginBottom: 8,
  },
  communityDescription: {
    color: colors.text.secondary,
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});