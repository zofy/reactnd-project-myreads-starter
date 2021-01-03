import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom';
import ListBooks from './ListBooks';

class SearchBooks extends Component {
    state = {
        query: "",
        searchResult: [],
    }

    searchBooks = (query) => {
        if (query === "") {
            this.setState(() => ({searchResult: []}));
            return;
        }
        BooksAPI.search(query)
            .then((books) => {
                if (this.state.query === query) {
                    this.setState(() => ({
                        searchResult: (books === undefined || books.error) ? [] : books,
                    }));
                }
            });
    }

    updateQuery = (text) => {
        this.setState(() => ({
            query: text,
        }));
        this.searchBooks(text);
    }

    render () {
        const { query, searchResult } = this.state;
        const { shelves, onShelfUpdate } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            value={query}
                            placeholder="Search by title or author"
                            onChange={(e) => {this.updateQuery(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ListBooks
                        books={searchResult}
                        shelves={shelves}
                        onShelfUpdate={onShelfUpdate}
                    />
                </div>
            </div>
        )
    }
}

export default SearchBooks;