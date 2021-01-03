import React from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'

const shelfMapping = {
    currentlyReading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read",
    none: "None",
  }

function ListBookshelves(props) {
    const { books, shelves, onShelfUpdate } = props;
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            {Object.entries(shelves).map(([shelf, booksIDs], idx) => {
                return (
                <div key={idx}>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">{shelfMapping[shelf]}</h2>
                        <div className="bookshelf-books">
                            <ListBooks
                                books={booksIDs.map((id) => books[id])}
                                shelves={shelves}
                                onShelfUpdate={onShelfUpdate}/>
                        </div>
                    </div>
                </div>
                )})}
            </div>
            <div className="open-search">
                <Link to="/search"><button>Add a book</button></Link>
            </div>
        </div>
    )
  }

export default ListBookshelves;