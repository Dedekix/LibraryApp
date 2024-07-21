import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('bookLibrary.db');

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, rating REAL, description TEXT)',
        [],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const addBook = (book) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO books (title, author, rating, description) VALUES (?, ?, ?, ?)',
        [book.title, book.author, book.rating, book.description],
        (_, { insertId }) => resolve(insertId),
        (_, error) => reject(error)
      );
    });
  });
};

export const updateBook = (book) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE books SET title = ?, author = ?, rating = ?, description = ? WHERE id = ?',
        [book.title, book.author, book.rating, book.description, book.id],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM books WHERE id = ?',
        [id],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
};

export const getBooks = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM books',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const getBookById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM books WHERE id = ?',
        [id],
        (_, { rows }) => resolve(rows._array[0]),
        (_, error) => reject(error)
      );
    });
  });
};