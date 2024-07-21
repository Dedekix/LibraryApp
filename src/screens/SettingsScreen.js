import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, List, Divider, useTheme } from 'react-native-paper';
import { saveThemePreference, getThemePreference } from '../utils/storage';


function SettingsScreen({ isDarkMode, setIsDarkMode }) {
  const [notifications, setNotifications] = useState(true);
  const { colors } = useTheme();

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    const savedTheme = await getThemePreference();
    setIsDarkMode(savedTheme);
  };

  const handleThemeChange = async (value) => {
    setIsDarkMode(value);
    await saveThemePreference(value);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <List.Section>
        <List.Subheader>Appearance</List.Subheader>
        <List.Item
          title="Dark Mode"
          description="Enable dark mode for the app"
          left={(props) => <List.Icon {...props} icon="brightness-4" />}
          right={() => (
            <Switch value={isDarkMode} onValueChange={handleThemeChange} />
          )}
        />
        <Divider />
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Push Notifications"
          description="Receive notifications about new books"
          left={(props) => <List.Icon {...props} icon="bell" />}
          right={() => (
            <Switch value={notifications} onValueChange={setNotifications} />
          )}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;