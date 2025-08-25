import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [shakeAnimation] = useState(new Animated.Value(0));

  const shakeInput = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError('Task title is required');
      shakeInput();
      return;
    }
    
    // Clear any previous errors
    setTitleError('');
    onAddTask(title.trim(), description.trim());
    setTitle('');
    setDescription('');
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setTitleError('');
    onClose();
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
    // Clear error when user starts typing
    if (titleError && text.trim()) {
      setTitleError('');
    }
  };

  const hasValidTitle = title.trim().length > 0;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View 
        className="flex-1 bg-black bg-opacity-50"
        style={{ 
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View className="flex-1 justify-center items-center p-4">
            <TouchableWithoutFeedback onPress={() => {}}>
              <View className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm border border-gray-800">
                <Text className="text-white text-2xl font-bold mb-6 text-center">
                  Add New Task
                </Text>

                <View className="mb-4">
                  <Animated.View
                    style={{
                      transform: [{ translateX: shakeAnimation }]
                    }}
                  >
                    <TextInput
                      className={`p-4 rounded-xl text-lg border ${
                        titleError 
                          ? 'bg-red-900 border-red-500 text-white' 
                          : 'bg-gray-800 border-gray-700 text-white'
                      }`}
                      placeholder="Task title"
                      placeholderTextColor={titleError ? "#FCA5A5" : "#9CA3AF"}
                      value={title}
                      onChangeText={handleTitleChange}
                      autoFocus
                    />
                  </Animated.View>
                  
                  {titleError && (
                    <Text className="text-red-400 text-sm mt-2 ml-1">
                      {titleError}
                    </Text>
                  )}
                </View>

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
                    className={`flex-1 p-4 rounded-xl items-center ${
                      hasValidTitle ? 'bg-purple-600' : 'bg-gray-600'
                    }`}
                    onPress={handleSubmit}
                  >
                    <Text className={`font-semibold text-lg ${
                      hasValidTitle ? 'text-white' : 'text-gray-400'
                    }`}>
                      Create
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};