import React, { useRef, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Task } from '../types/task';
import { ANIMATION_CONFIG } from '../constants/animations';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onDelete,
  isDeleting = false
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const togglePressAnim = useRef(new Animated.Value(1)).current;
  const deletePressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isDeleting) {
      // Slide out to the right and fade out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: ANIMATION_CONFIG.DURATION_NORMAL,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: ANIMATION_CONFIG.DURATION_NORMAL,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Call onDelete after animation completes
        onDelete(task.id);
      });
    }
  }, [isDeleting, onDelete, task.id, slideAnim, opacityAnim]);

  const handleDelete = useCallback(() => {
    // Start deletion animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: ANIMATION_CONFIG.DURATION_NORMAL,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: ANIMATION_CONFIG.DURATION_NORMAL,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete(task.id);
    });
  }, [onDelete, task.id, slideAnim, opacityAnim]);

  const handleTogglePressIn = () => {
    Animated.spring(togglePressAnim, {
      toValue: ANIMATION_CONFIG.SCALE_PRESS,
      useNativeDriver: true,
      tension: ANIMATION_CONFIG.TENSION,
      friction: ANIMATION_CONFIG.FRICTION,
    }).start();
  };

  const handleTogglePressOut = () => {
    Animated.spring(togglePressAnim, {
      toValue: ANIMATION_CONFIG.SCALE_NORMAL,
      useNativeDriver: true,
      tension: ANIMATION_CONFIG.TENSION,
      friction: ANIMATION_CONFIG.FRICTION,
    }).start();
  };

  const handleDeletePressIn = () => {
    Animated.spring(deletePressAnim, {
      toValue: ANIMATION_CONFIG.SCALE_PRESS_FAB,
      useNativeDriver: true,
      tension: ANIMATION_CONFIG.TENSION,
      friction: ANIMATION_CONFIG.FRICTION,
    }).start();
  };

  const handleDeletePressOut = () => {
    Animated.spring(deletePressAnim, {
      toValue: ANIMATION_CONFIG.SCALE_NORMAL,
      useNativeDriver: true,
      tension: ANIMATION_CONFIG.TENSION,
      friction: ANIMATION_CONFIG.FRICTION,
    }).start();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Animated.View
      className={`bg-gray-900 rounded-lg p-4 mb-3 border ${
        task.completed ? 'border-green-600' : 'border-gray-800'
      }`}
      style={{
        transform: [{ translateX: slideAnim }],
        opacity: opacityAnim,
      }}
    >
      <View className="flex-row items-start justify-between mb-2">
        <TouchableOpacity
          className="flex-1 flex-row items-start"
          onPress={() => onToggle(task.id)}
          onPressIn={handleTogglePressIn}
          onPressOut={handleTogglePressOut}
          activeOpacity={0.8}
        >
          <Animated.View
            style={{ transform: [{ scale: togglePressAnim }] }}
            className={`w-6 h-6 rounded-full border-2 mr-3 mt-1 ${
              task.completed
                ? 'bg-green-600 border-green-600'
                : 'border-gray-400'
            }`}
          >
            {task.completed && (
              <Text className="text-white text-center text-sm">✓</Text>
            )}
          </Animated.View>

          <View className="flex-1">
            <Text className={`text-lg font-semibold mb-1 ${
              task.completed ? 'text-gray-400 line-through' : 'text-white'
            }`}>
              {task.title}
            </Text>

            {task.description && (
              <Text className={`text-sm mb-2 ${
                task.completed ? 'text-gray-500' : 'text-gray-300'
              }`}>
                {task.description}
              </Text>
            )}

            <Text className="text-xs text-gray-500">
              Created: {formatDate(task.createdAt)}
            </Text>
          </View>
        </TouchableOpacity>

        <Animated.View style={{ transform: [{ scale: deletePressAnim }] }}>
          <TouchableOpacity
            className="ml-3 p-2"
            onPress={handleDelete}
            onPressIn={handleDeletePressIn}
            onPressOut={handleDeletePressOut}
            activeOpacity={0.7}
          >
            <Text className="text-red-400 text-lg font-bold">×</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};