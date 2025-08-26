# Task Manager App

A modern, responsive task management application built with React Native and Expo. This app demonstrates clean architecture, smooth animations, and professional UI/UX design patterns.

## 🚀 Features

### Core Functionality
- **Add Tasks**: Create new tasks with title and optional description
- **Mark Complete**: Toggle task completion status with visual feedback
- **Delete Tasks**: Remove tasks with smooth slide-out animations
- **Filter Tasks**: Three-state filtering system (All/Todo/Completed)

### Enhanced User Experience
- **Dark Theme**: OLED-optimized dark interface with purple accents
- **Responsive Design**: Adapts to different screen sizes and device notches
- **Smooth Animations**: Task deletion animations and validation feedback
- **Keyboard Aware**: Modal automatically adjusts when keyboard appears
- **Safe Area Handling**: Works perfectly on devices with notches and punch-holes

## 🛠️ Tech Stack

### Core Technologies
- **React Native** (0.79.5) - Cross-platform mobile development
- **Expo** (53.0.22) - Development platform and build tools
- **TypeScript** (5.8.3) - Type-safe JavaScript development

### UI & Styling
- **NativeWind** (latest) - Tailwind CSS for React Native
- **Tailwind CSS** (3.4.0) - Utility-first CSS framework

### Animation & Interaction
- **React Native Reanimated** (3.17.4) - Smooth, native animations
- **React Native Safe Area Context** (5.4.0) - Safe area handling

### Development Tools
- **ESLint** (9.25.1) - Code quality and consistency
- **Prettier** (3.2.5) - Code formatting
- **Babel** (7.20.0) - JavaScript compiler

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager
- Expo CLI (optional, but recommended)
- iOS Simulator (for iOS development) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ChapterOne_TaskManager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Install **Expo Go** app on your phone
   - Scan the QR code displayed in the terminal
   - Or press `a` for Android or `i` for iOS simulator

### Alternative: Development Build
```bash
# For custom native code
npx expo prebuild
npx expo run:android  # Android
npx expo run:ios      # iOS
```

## 📖 Usage Guide

### Adding Tasks
1. Tap the **purple + button** in the bottom right corner
2. Enter a **task title** (required)
3. Add an optional **description**
4. Tap **Create** to add the task

### Managing Tasks
- **Complete a task**: Tap the circle checkbox next to the task
- **Delete a task**: Tap the red × button on the right side
- **Filter tasks**: Use the **Todo** and **Completed** toggle buttons

### Filtering System
- **No filter selected**: Shows all tasks
- **Todo button active**: Shows only incomplete tasks
- **Completed button active**: Shows only completed tasks
- **Tap active filter again**: Returns to showing all tasks

## 🎨 Design Philosophy

### Visual Design
- **Dark Theme**: Pure black backgrounds for OLED displays
- **Purple Accents**: Purple-600 for active states and interactions
- **Clean Typography**: Clear hierarchy with proper contrast
- **Smooth Transitions**: Seamless animations throughout the app

### User Experience
- **Intuitive Navigation**: Floating action button for easy access
- **Visual Feedback**: Immediate response to user actions
- **Accessibility**: Proper touch targets and visual indicators
- **Performance**: Optimized with React hooks and memoization

## 🔧 Project Structure

```
ChapterOne_TaskManager/
├── components/           # React components
│   ├── TaskManager.tsx  # Main app component
│   ├── TaskCard.tsx     # Individual task display
│   ├── FilterButtons.tsx # Filter toggle buttons
│   └── AddTaskModal.tsx # Task creation modal
├── types/               # TypeScript type definitions
│   └── task.ts         # Task and state interfaces
├── App.tsx             # Root application component
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## 🚀 Performance Features

- **Memoized Components**: Prevents unnecessary re-renders
- **Optimized Callbacks**: Uses useCallback for event handlers
- **Efficient Filtering**: useMemo for task filtering operations
- **Native Animations**: Hardware-accelerated animations

## 🧪 Testing

The app is designed to work across various devices and scenarios:

- **Different Screen Sizes**: Responsive layout for phones and tablets
- **Device Notches**: Safe area handling for modern devices
- **Orientation Changes**: Adapts to portrait and landscape modes
- **Keyboard Interactions**: Modal positioning with keyboard awareness

## 📱 Platform Support

- **iOS**: 13.0 and later
- **Android**: API level 21 (Android 5.0) and later
- **Web**: Compatible with Expo web builds

## 🤝 Contributing

This is a demonstration project for a React Native technical interview. The code showcases:

- Clean, maintainable architecture
- Modern React Native patterns
- Professional UI/UX design
- Performance optimization techniques
- Comprehensive documentation

## 📄 License

This project is created for demonstration purposes as part of a technical interview process.

## 🙏 Acknowledgments

- **Expo** team for the excellent development platform
- **React Native** community for the robust framework
- **Tailwind CSS** team for the utility-first approach

---

**Built with ❤️ using React Native and Expo**