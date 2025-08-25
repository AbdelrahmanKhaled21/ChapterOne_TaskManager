import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface FilterButtonsProps {
  currentFilter: 'all' | 'completed' | 'todo';
  onFilterChange: (filter: 'all' | 'completed' | 'todo') => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onFilterChange
}) => {
  const handleFilterToggle = (filter: 'completed' | 'todo') => {
    if (currentFilter === filter) {
      // If the same filter is tapped, deselect it (go back to 'all')
      onFilterChange('all');
    } else {
      // Otherwise, select the new filter
      onFilterChange(filter);
    }
  };

  return (
    <View className="flex-row justify-center space-x-3 mb-4">
      <TouchableOpacity
        className={`px-6 py-3 rounded-full border ${
          currentFilter === 'todo'
            ? 'bg-purple-600 border-purple-600'
            : 'bg-gray-800 border-gray-700'
        }`}
        onPress={() => handleFilterToggle('todo')}
      >
        <Text
          className={`font-semibold ${
            currentFilter === 'todo' ? 'text-white' : 'text-gray-400'
          }`}
        >
          Todo
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-6 py-3 rounded-full border ${
          currentFilter === 'completed'
            ? 'bg-purple-600 border-purple-600'
            : 'bg-gray-800 border-gray-700'
        }`}
        onPress={() => handleFilterToggle('completed')}
      >
        <Text
          className={`font-semibold ${
            currentFilter === 'completed' ? 'text-white' : 'text-gray-400'
          }`}
        >
          Completed
        </Text>
      </TouchableOpacity>
    </View>
  );
};