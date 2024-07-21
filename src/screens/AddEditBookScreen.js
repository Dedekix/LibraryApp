import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { addBook, updateBook } from '../Services/DatabaseService';

function AddEditBookScreen({ route, navigation }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

  const book = route.params?.book;
  const { colors} = useTheme();

  useEffect(() => {
    if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setRating(book.rating.toString());
        setDescription(book.description || '');
    }
  }, [book]);

  const handleSave = async () => {
    const bookData = {
        title,
        author,
        rating: parseFloat(rating),
        description,
  };
  if (book) {
    bookData.id = book.id;
    await updateBook(bookData);
  } else {
    await addBook(bookData);
  }

  navigation.goBack();
};

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Author"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <TextInput
        label="Cover Image URL"
        value={cover}
        onChangeText={setCover}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Book
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default AddEditBookScreen;