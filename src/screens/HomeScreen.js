import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, FAB, Appbar, useTheme } from 'react-native-paper';
import { getSortPreference, saveSortPreference } from '../utils/storage';
import { getBooks } from '../Services/DatabaseService';
import * as SQLite from 'expo-sqlite';
//import App from './HomeScreen';

const initialBooks = [
  { id: '1', title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: '1.jfif' },
  { id: '2', title: 'The Hoddie Girl', author: 'Yuen Wright', cover: '4.jfif' },
  { id: '3', title: 'Kill Me Attorney', author: 'Josh Gonzalez', cover: '5.jfif' },
  { id: '4', title: 'The Devils Trap', author: 'April Avery', cover: '6.jfif' },
  { id: '5', title: 'The Vampire Kings Detective Wife', author: 'Jeka BC', cover: '7.jfif' },
];

function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState('title');
  const [menuVisible, setMenuVisible] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    loadBooks();
    loadSortPreference();
  }, []);

  useEffect(() => {
    sortBooks();
  }, [sortBy, books]);

  const loadBooks = async () => {
    const loadedBooks = await getBooks();
    setBooks(loadedBooks);
  };

  const loadSortPreference = async () => {
    const savedSort = await getSortPreference();
    setSortBy(savedSort);
  };

  const sortBooks = () => {
    const sortedBooks = [...books].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
    setBooks(sortedBooks);
  };

  const handleSort = async (newSortBy) => {
    setSortBy(newSortBy);
    await saveSortPreference(newSortBy);
    setMenuVisible(false);
  };

  const renderBookItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.author}</Paragraph>
        <Paragraph>Rating: {item.rating}</Paragraph>
      </Card.Content>
    </Card>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Appbar.Header>
          <Appbar.Content title="My Book Library" />
          <Appbar.Action icon="cog" onPress={() => navigation.navigate('Settings')} />
        </Appbar.Header>
      ),
    });
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddEditBook')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
