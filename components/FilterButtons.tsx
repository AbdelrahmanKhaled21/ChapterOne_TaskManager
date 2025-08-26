import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { ANIMATION_CONFIG, COLORS } from '../constants/animations';

interface FilterButtonsProps {
  currentFilter: 'all' | 'completed' | 'todo';
  onFilterChange: (filter: 'all' | 'completed' | 'todo') => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onFilterChange
}) => {
  const [todoPressAnim] = useState(new Animated.Value(1));
  const [completedPressAnim] = useState(new Animated.Value(1));

  const handleFilterToggle = (filter: 'completed' | 'todo') => {
    if (currentFilter === filter) {
      // If the same filter is tapped, deselect it (go back to 'all')
      onFilterChange('all');
    } else {
      // Otherwise, select the new filter
      onFilterChange(filter);
    }
  };

  const handlePressIn = (animValue: Animated.Value) => {
    Animated.spring(animValue, {
      toValue: ANIMATION_CONFIG.SCALE_PRESS,
      useNativeDriver: true,
      tension: ANIMATION_CONFIG.TENSION,
      friction: ANIMATION_CONFIG.FRICTION,
    }).start();
  };

  const handlePressOut = (animValue: Animated.Value) => {
    Animated.spring(animValue, {
      toValue: ANIMATION_CONFIG.SCALE_NORMAL,
      useNativeDriver: true,
      tension: ANIMATION_CONFIG.TENSION,
      friction: ANIMATION_CONFIG.FRICTION,
    }).start();
  };

  return (
    <View className="flex-row justify-center mb-4">
      <Animated.View style={{ transform: [{ scale: todoPressAnim }] }}>
        <TouchableOpacity
          className={`px-6 py-3 rounded-full border ${
            currentFilter === 'todo'
              ? 'bg-purple-600 border-purple-600'
              : 'bg-gray-800 border-gray-700'
          }`}
          onPress={() => handleFilterToggle('todo')}
          onPressIn={() => handlePressIn(todoPressAnim)}
          onPressOut={() => handlePressOut(todoPressAnim)}
          activeOpacity={0.8}
          style={{
            shadowColor: currentFilter === 'todo' ? COLORS.SHADOW_PURPLE : COLORS.SHADOW_BLACK,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: currentFilter === 'todo' ? 0.3 : 0.1,
            shadowRadius: 4,
            elevation: currentFilter === 'todo' ? 6 : 2,
          }}
        >
          <Text
            className={`font-semibold ${
              currentFilter === 'todo' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Todo
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ scale: completedPressAnim }],
          marginLeft: ANIMATION_CONFIG.BUTTON_SPACING
        }}
      >
        <TouchableOpacity
          className={`px-6 py-3 rounded-full border ${
            currentFilter === 'completed'
              ? 'bg-purple-600 border-purple-600'
              : 'bg-gray-800 border-gray-700'
          }`}
          onPress={() => handleFilterToggle('completed')}
          onPressIn={() => handlePressIn(completedPressAnim)}
          onPressOut={() => handlePressOut(completedPressAnim)}
          activeOpacity={0.8}
          style={{
            shadowColor: currentFilter === 'completed' ? COLORS.SHADOW_PURPLE : COLORS.SHADOW_BLACK,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: currentFilter === 'completed' ? 0.3 : 0.1,
            shadowRadius: 4,
            elevation: currentFilter === 'completed' ? 6 : 2,
          }}
        >
          <Text
            className={`font-semibold ${
              currentFilter === 'completed' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};