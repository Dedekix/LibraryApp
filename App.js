import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import * as Font from 'expo-font';
import { getThemePreference } from './src/utils/storage';
import { AppRegistry, View } from 'react-native';
import { registerRootComponent } from 'expo';
import { initDatabase } from '../BookLibraryApp/src/Services/DatabaseService';
import * as SQLite from 'expo-sqlite';

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
    background: '#f6f6f6',
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#BB86FC',
    accent: '#03dac4',
    background: '#121212',
  },
};

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    async function loadFontsAndPreferences() {
      try {
        const savedTheme = await getThemePreference();
        setIsDarkMode(savedTheme === 'dark');
        await initDatabase();
        setDatabaseInitialized(true);
      } catch (error) {
        console.error('Error loading fonts or preferences:', error);
      } finally {
        setFontsLoaded(true);
      }
    }

    loadFontsAndPreferences();
  }, []);

  if (!fontsLoaded) {
    return <View />; // Return an empty view while loading
  }

  return (
    <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        <AppNavigator isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default registerRootComponent(App);