import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import ExpressScreen from '../screens/Express/ExpressScreen';
import ConnectScreen from '../screens/Connect/ConnectScreen';
import StudioScreen from '../screens/Studio/StudioScreen';
import LiveScreen from '../screens/Live/LiveScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
      }}
    >
      <Tab.Screen
        name="Express"
        component={ExpressScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="play-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Connect"
        component={ConnectScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account-group-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Studio"
        component={StudioScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="plus-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Live"
        component={LiveScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="broadcast" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}