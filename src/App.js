import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ListBookshelves from './ListBookshelves'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      categories: {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      },
    }
  }

  componentDidMount() {
    const allBooks = await BooksAPI.getAll();
    var booksMap = {}
    allBooks.map((b) => booksMap[b.id] = b);

    this.setState(() => ({
      books: booksMap,
      categories: {
        currentlyReading: allBooks.filter((b) => b.shelf === "currentlyReading").map((b) => b.id),
        wantToRead: allBooks.filter((b) => b.shelf === "wantToRead").map((b) => b.id),
        read: allBooks.filter((b) => b.shelf === "read").map((b) => b.id),
      },
    }));
  }

  updateShelf = (book, shelf) => {
    const newState = await BooksAPI.update(book, shelf);
    const updatedBook = await BooksAPI.get(book.id);
    this.setState((prevState) => {
      prevState.books[book.id] = updatedBook;
      return {
        books: prevState.books,
        categories: {
          currentlyReading: newState.currentlyReading,
          wantToRead: newState.wantToRead,
          read: newState.read,
        },
      }
    });
  }

  render() {
    const { books, categories } = this.state;
    return (
      <div className="app">
        <Route exact path="/">
          <ListBookshelves books={books} shelves={categories}  onShelfUpdate={this.updateShelf}/>
        </Route>
        <Route path="/search">
          <SearchBooks shelves={categories} onShelfUpdate={this.updateShelf} />
        </Route>
      </div>
    )
  }
}

export default BooksApp
