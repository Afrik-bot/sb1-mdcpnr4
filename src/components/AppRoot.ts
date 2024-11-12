import { Frame } from '@nativescript/core';
import { HomeScreen } from '../screens/HomeScreen';

export class AppRootComponent {
  constructor() {
    // Initialize app-level dependencies
  }

  $start() {
    const frame = new Frame();
    frame.navigate({
      create: () => new HomeScreen()
    });
    return frame;
  }
}