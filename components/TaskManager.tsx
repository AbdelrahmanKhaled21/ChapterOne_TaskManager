import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Task, TaskManagerState } from '../types/task';
import { TaskCard } from './TaskCard';
import { FilterButtons } from './FilterButtons';
import { AddTaskModal } from './AddTaskModal';

export const TaskManager: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<TaskManagerState>({
    tasks: [],
    filter: 'all'
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    setState(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
    setIsModalVisible(false);
  };

  const toggleTask = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const deleteTask = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id)
    }));
  };

  const setFilter = (filter: 'all' | 'completed' | 'todo') => {
    setState(prev => ({ ...prev, filter }));
  };

  const getFilteredTasks = () => {
    switch (state.filter) {
      case 'completed':
        return state.tasks.filter(task => task.completed);
      case 'todo':
        return state.tasks.filter(task => !task.completed);
      default:
        return state.tasks;
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header with safe area top padding */}
      <View 
        className="p-4"
        style={{ paddingTop: Math.max(insets.top + 16, 20) }}
      >
        <Text className="text-3xl font-bold text-white mb-6 text-center">
          Task Manager
        </Text>
        
        <FilterButtons 
          currentFilter={state.filter} 
          onFilterChange={setFilter} 
        />
      </View>
      
      <ScrollView 
        className="flex-1 px-4" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Add bottom padding for FAB
      >
        {getFilteredTasks().length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-gray-400 text-lg">
              {state.filter === 'all' 
                ? 'No tasks yet. Tap the + button to add your first task!' 
                : `No ${state.filter} tasks found.`
              }
            </Text>
          </View>
        ) : (
          getFilteredTasks().map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </ScrollView>

      {/* Floating Action Button with safe area bottom padding */}
      <TouchableOpacity
        className="absolute w-16 h-16 bg-purple-600 rounded-full items-center justify-center shadow-lg"
        onPress={() => setIsModalVisible(true)}
        style={{
          bottom: Math.max(insets.bottom + 16, 20),
          right: 24,
          shadowColor: '#9333EA',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Text className="text-white text-3xl font-bold">+</Text>
      </TouchableOpacity>

      {/* Add Task Modal */}
      <AddTaskModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddTask={addTask}
      />
    </View>
  );
};