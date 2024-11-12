import { Application } from '@nativescript/core';
import { AppRootComponent } from './components/AppRoot';

Application.run({ create: () => new AppRootComponent().$start() });