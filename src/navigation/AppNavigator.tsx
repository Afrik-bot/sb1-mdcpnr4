import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

import ExpressScreen from '../screens/Express/ExpressScreen';
import ConnectScreen from '../screens/Connect/ConnectScreen';
import StudioScreen from '../screens/Studio/StudioScreen';
import LiveScreen from '../screens/Live/LiveScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text.primary,
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
            <Icon name="account-group" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Studio"
        component={StudioScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="plus-circle" size={32} color={colors.primary} />
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
            <Icon name="account-circle" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}