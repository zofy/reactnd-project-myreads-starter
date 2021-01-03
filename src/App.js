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

  initialSetup = (allBooks) => {
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

  componentDidMount() {
    BooksAPI.getAll()
      .then((allBooks) => {
        this.initialSetup(allBooks);
      });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((newState) => {
        BooksAPI.get(book.id)
          .then((updatedBook) =>
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
            }));
      });
  }

  render() {
    const { books, categories } = this.state;
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <ListBookshelves books={books} shelves={categories}  onShelfUpdate={this.updateShelf}/>
        )} />
        <Route path="/search" render={() => (
          <SearchBooks shelves={categories} onShelfUpdate={this.updateShelf} />
          )}/>
      </div>
    )
  }
}

export default BooksApp
