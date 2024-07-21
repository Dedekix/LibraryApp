import AsyncStorage from '@react-native-async-storage/async-storage';

const SORT_PREFERENCE_KEY = '@sort_preference';
const THEME_PREFERENCE_KEY = '@theme_preference';

export const saveSortPreference = async (sortBy) => {
  try {
    await AsyncStorage.setItem(SORT_PREFERENCE_KEY, sortBy);
  } catch (e) {
    console.error('Failed to save sort preference', e);
  }
};

export const getSortPreference = async () => {
  try {
    return await AsyncStorage.getItem(SORT_PREFERENCE_KEY) || 'title';
  } catch (e) {
    console.error('Failed to get sort preference', e);
    return 'title';
  }
};

export const saveThemePreference = async (isDarkMode) => {
  try {
    await AsyncStorage.setItem(THEME_PREFERENCE_KEY, JSON.stringify(isDarkMode));
  } catch (e) {
    console.error('Failed to save theme preference', e);
  }
};

export const getThemePreference = async () => {
  try {
    const value = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
    return value !== null ? JSON.parse(value) : false;
  } catch (e) {
    console.error('Failed to get theme preference', e);
    return false;
  }
};