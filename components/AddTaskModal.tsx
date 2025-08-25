import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string) => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  visible,
  onClose,
  onAddTask
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center p-4">
          <TouchableWithoutFeedback onPress={() => {}}>
            <View className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm border border-gray-800">
              <Text className="text-white text-2xl font-bold mb-6 text-center">
                Add New Task
              </Text>

              <TextInput
                className="bg-gray-800 text-white p-4 rounded-xl mb-4 border border-gray-700 text-lg"
                placeholder="Task title"
                placeholderTextColor="#9CA3AF"
                value={title}
                onChangeText={setTitle}
                autoFocus
              />

              <TextInput
                className="bg-gray-800 text-white p-4 rounded-xl mb-6 border border-gray-700 text-base"
                placeholder="Task description (optional)"
                placeholderTextColor="#9CA3AF"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
              />

              <View className="flex-row space-x-3">
                <TouchableOpacity
                  className="flex-1 bg-gray-700 p-4 rounded-xl items-center"
                  onPress={handleClose}
                >
                  <Text className="text-white font-semibold text-lg">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 bg-purple-600 p-4 rounded-xl items-center"
                  onPress={handleSubmit}
                  disabled={!title.trim()}
                >
                  <Text className="text-white font-semibold text-lg">
                    Create
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};