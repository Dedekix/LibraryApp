import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Paragraph, Button, Card, useTheme } from 'react-native-paper';
import { getBookById, deleteBook } from '../Services/DatabaseService';

function BookDetailScreen({ route, navigation }) {
    const [book, setBook] = useState(null);
    const { colors } = useTheme();
    const bookId = route.params.bookId;

    useEffect(() => {
        loadBook();
      }, []);
    
      const loadBook = async () => {
        const loadedBook = await getBookById(bookId);
        setBook(loadedBook);
      };
    
      const handleDelete = async () => {
        await deleteBook(bookId);
        navigation.goBack();
      };
    
      if (!book) {
        return null;
      }
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Card>
        <Card.Cover source={{ uri: book.cover }} />
        <Card.Content>
          <Title style={styles.title}>{book.title}</Title>
          <Paragraph style={styles.author}>by {book.author}</Paragraph>
          <Paragraph style={styles.description}>
            {book.description || "No description available."}
          </Paragraph>
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('AddEditBook', { book })}
          style={styles.button}
        >
          Edit Book
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    marginBottom: 16,
  },
  description: {
    marginTop: 16,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default BookDetailScreen;