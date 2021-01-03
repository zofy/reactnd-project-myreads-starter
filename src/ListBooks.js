import React from "react";

function ShelfChanger(props) {
    const { book, shelf, onShelfUpdate } = props;
    return (
        <div className="book-shelf-changer">
            <select defaultValue={shelf} onChange={(e) => {onShelfUpdate(book, e.target.value)}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

function getImageURL(book) {
    if (book.imageLinks) {
        return `url("${book.imageLinks.thumbnail}")`;
    }
    return "";
}

function mapShelf(book, shelves) {
    const matchedShelf = Object.entries(shelves)
                            .map(([shelf, bookIDs]) => [
                                shelf, 
                                bookIDs.findIndex((id) => id === book.id)
                            ])
                            .filter(([_, idx]) => idx > -1);
    if (matchedShelf.length === 0) { return "none"; }
    return matchedShelf[0][0];
}


function ListBooks(props) {
    const { books, shelves, onShelfUpdate } = props;
    return (
        <ol className="books-grid">
            {books.map((book) => (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div
                                className="book-cover"
                                style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: getImageURL(book),
                                }}>
                            </div>
                            <ShelfChanger
                                book={book}
                                shelf={mapShelf(book, shelves)}
                                onShelfUpdate={onShelfUpdate}
                            />
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                    </div>
                </li>
            ))}
        </ol>
    )
}

export default ListBooks;