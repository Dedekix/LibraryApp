import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import AddEditBookScreen from '../screens/AddEditBookScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

function AppNavigator({ isDarkMode, setIsDarkMode }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="AddEditBook" component={AddEditBookScreen} />
      <Stack.Screen name="Settings">
        {(props) => <SettingsScreen {...props} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default AppNavigator;