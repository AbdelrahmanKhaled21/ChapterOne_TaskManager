import React from 'react';
import { TaskManager } from 'components/TaskManager';
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  return (
    <>
      <TaskManager />
      <StatusBar style="light" />
    </>
  );
}
