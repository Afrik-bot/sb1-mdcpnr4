import { EventData, Page } from '@nativescript/core';
import { BaseNavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExpressScreen } from './Express/ExpressScreen';
import { ConnectScreen } from './Connect/ConnectScreen';
import { StudioScreen } from './Studio/StudioScreen';
import { LiveScreen } from './Live/LiveScreen';
import { ProfileScreen } from './Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export class HomeScreen extends Page {
  constructor() {
    super();
    this.className = 'home-page';
  }

  onNavigatingTo(args: EventData) {
    const page = args.object as Page;
    
    page.content = new BaseNavigationContainer({
      children: (
        <Tab.Navigator>
          <Tab.Screen name="Express" component={ExpressScreen} />
          <Tab.Screen name="Connect" component={ConnectScreen} />
          <Tab.Screen name="Studio" component={StudioScreen} />
          <Tab.Screen name="Live" component={LiveScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      )
    });
  }
}