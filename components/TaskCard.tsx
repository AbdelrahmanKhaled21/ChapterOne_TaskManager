import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Task } from '../types/task';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <View className={`bg-gray-900 rounded-lg p-4 mb-3 border ${
      task.completed ? 'border-green-600' : 'border-gray-800'
    }`}>
      <View className="flex-row items-start justify-between mb-2">
        <TouchableOpacity
          className="flex-1 flex-row items-start"
          onPress={() => onToggle(task.id)}
        >
          <View className={`w-6 h-6 rounded-full border-2 mr-3 mt-1 ${
            task.completed
              ? 'bg-green-600 border-green-600'
              : 'border-gray-400'
          }`}>
            {task.completed && (
              <Text className="text-white text-center text-sm">✓</Text>
            )}
          </View>

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

        <TouchableOpacity
          className="ml-3 p-2"
          onPress={() => onDelete(task.id)}
        >
          <Text className="text-red-400 text-lg font-bold">×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};