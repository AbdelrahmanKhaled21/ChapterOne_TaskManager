import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TaskManager } from 'components/TaskManager';
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <TaskManager />
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
