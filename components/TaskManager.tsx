import React, { useState, useMemo, useCallback, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Task, TaskManagerState } from '../types/task';
import { ANIMATION_CONFIG, COLORS } from '../constants/animations';
import { TaskCard } from './TaskCard';
import { FilterButtons } from './FilterButtons';
import { AddTaskModal } from './AddTaskModal';

/**
 * Main TaskManager component that handles the entire task management interface.
 *
 * Features:
 * - Add new tasks via modal overlay
 * - Toggle task completion status
 * - Delete tasks with smooth animations
 * - Filter tasks by status (All/Todo/Completed)
 * - Responsive design with safe area handling
 */
export const TaskManager: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [state, setState] = useState<TaskManagerState>({
    tasks: [],
    filter: 'all'
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fabPressAnim = useRef(new Animated.Value(1)).current;

  /**
   * Adds a new task to the task list
   * @param title - The task title (required)
   * @param description - The task description (optional)
   */
  const addTask = useCallback((title: string, description: string) => {
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
  }, []);

  /**
   * Toggles the completion status of a task
   * @param id - The unique identifier of the task to toggle
   */
  const toggleTask = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    }));
  }, []);

  /**
   * Removes a task from the task list
   * @param id - The unique identifier of the task to delete
   */
  const deleteTask = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== id)
    }));
  }, []);

  /**
   * Updates the current filter for displaying tasks
   * @param filter - The filter type: 'all', 'completed', or 'todo'
   */
  const setFilter = useCallback((filter: 'all' | 'completed' | 'todo') => {
    setState(prev => ({ ...prev, filter }));
  }, []);

  /**
   * Returns the filtered list of tasks based on current filter
   * @returns Array of tasks matching the current filter criteria
   */
  const getFilteredTasks = useMemo(() => {
    switch (state.filter) {
      case 'completed':
        return state.tasks.filter(task => task.completed);
      case 'todo':
        return state.tasks.filter(task => !task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  /**
   * Memoized empty state message to prevent unnecessary re-renders
   */
  const emptyStateMessage = useMemo(() => {
    if (state.filter === 'all') {
      return 'No tasks yet. Tap the + button to add your first task!';
    }
    return `No ${state.filter} tasks found.`;
  }, [state.filter]);

  const handleFabPressIn = () => {
    Animated.spring(fabPressAnim, {
      toValue: ANIMATION_CONFIG.SCALE_PRESS_FAB,
      useNativeDriver: true,
      tension: ANIMATION_CONFIG.TENSION,
      friction: ANIMATION_CONFIG.FRICTION,
    }).start();
  };

  const handleFabPressOut = () => {
    Animated.spring(fabPressAnim, {
      toValue: ANIMATION_CONFIG.SCALE_NORMAL,
      useNativeDriver: true,
      tension: ANIMATION_CONFIG.TENSION,
      friction: ANIMATION_CONFIG.FRICTION,
    }).start();
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header with safe area top padding */}
      <View
        className="p-4"
        style={{ paddingTop: Math.max(insets.top + ANIMATION_CONFIG.SAFE_AREA_OFFSET, ANIMATION_CONFIG.SAFE_AREA_MIN) }}
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
        contentContainerStyle={{ paddingBottom: ANIMATION_CONFIG.BOTTOM_PADDING }}
      >
        {getFilteredTasks.length === 0 ? (
          <View className="items-center justify-center py-8">
            <Text className="text-gray-400 text-lg">
              {emptyStateMessage}
            </Text>
          </View>
        ) : (
          getFilteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </ScrollView>

      {/* Floating Action Button with enhanced micro-interactions */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: Math.max(insets.bottom + ANIMATION_CONFIG.SAFE_AREA_OFFSET, ANIMATION_CONFIG.SAFE_AREA_MIN),
          right: ANIMATION_CONFIG.RIGHT_MARGIN,
          transform: [{ scale: fabPressAnim }],
        }}
      >
        <TouchableOpacity
          className="w-16 h-16 bg-purple-600 rounded-full items-center justify-center"
          onPress={() => setIsModalVisible(true)}
          onPressIn={handleFabPressIn}
          onPressOut={handleFabPressOut}
          activeOpacity={1}
          style={{
            shadowColor: COLORS.SHADOW_PURPLE,
            shadowOffset: { width: 0, height: ANIMATION_CONFIG.SHADOW_OFFSET },
            shadowOpacity: ANIMATION_CONFIG.SHADOW_OPACITY,
            shadowRadius: ANIMATION_CONFIG.SHADOW_RADIUS,
            elevation: ANIMATION_CONFIG.ELEVATION,
          }}
        >
          <Text className="text-white text-3xl font-bold">+</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Add Task Modal */}
      <AddTaskModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddTask={addTask}
      />
    </View>
  );
};