import React, { Component } from "react";
import BookTable from "./BookTable";
import SearchBar from "./SearchBar";

class BookList extends Component {
  state = {
    filteredBooks: this.props.books
  };

  filterBooks = lowerLetter => {
    lowerLetter = lowerLetter.toLowerCase();
    let filteredBooks = this.props.books.filter(book =>
      book.title.toLowerCase().includes(lowerLetter)
    );
    this.setState({ filteredBooks });
  };
  filterBooksColor = bookColor => {
    return this.state.filteredBooks.filter(book => book.color === bookColor);
  };

  render() {
    const bookColor = this.props.match.params.bookColor;
    let books = this.state.filteredBooks;

    if (bookColor) {
      books = this.filterBooksColor(bookColor);
    }
    return (
      <div>
        <SearchBar handleFilter={this.filterBooks} />
        <BookTable books={books} />
      </div>
    );
  }
}

export default BookList;
