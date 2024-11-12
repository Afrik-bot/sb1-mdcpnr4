import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ExpressScreen from './src/screens/Express/ExpressScreen';
import ConnectScreen from './src/screens/Connect/ConnectScreen';
import StudioScreen from './src/screens/Studio/StudioScreen';
import LiveScreen from './src/screens/Live/LiveScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor: '#222',
          },
          tabBarActiveTintColor: '#A855F7',
          tabBarInactiveTintColor: '#666',
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Express"
          component={ExpressScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Connect"
          component={ConnectScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-group" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Studio"
          component={StudioScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="plus-circle" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Live"
          component={LiveScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="broadcast" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" size={26} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}