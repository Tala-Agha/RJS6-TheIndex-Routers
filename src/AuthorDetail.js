import React, { Component } from "react";
import axios from "axios";

// Components
import BookRow from "./BookRow";
import Loading from "./Loading";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class AuthorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: {},
      loading: true
    };
  }

  componentDidMount() {
    this.getAuthor();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.authorID !== this.props.match.params.authorID) {
      this.getAuthor();
    }
  }

  getAuthor() {
    const authorID = this.props.match.params.authorID;
    this.setState({ loading: true });
    instance
      .get(`/api/authors/${authorID}`)
      .then(res => res.data)
      .then(author => this.setState({ author: author, loading: false }))
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const author = this.state.author;
      const bookRows = author.books.map(book => (
        <BookRow key={book.title} book={book} />
      ));

      return (
        <div className="author">
          <div>
            <h3>{author.first_name + " " + author.last_name}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={author.first_name + " " + author.last_name}
            />
          </div>
          <table className="mt-3 table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Authors</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>{bookRows}</tbody>
          </table>
        </div>
      );
    }
  }
}

export default AuthorDetail;