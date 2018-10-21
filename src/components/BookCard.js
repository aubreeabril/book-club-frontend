import React from "react";
import { connect } from "react-redux";
import { Card, Button } from "antd";
import { saveUserBook } from "../redux/actions";

class BookCard extends React.Component {
  handleClick = (userId, book) => {
    this.props.saveUserBook(userId, book);
  };

  render() {
    const { book, currentUser } = this.props;
    return (
      <Card style={{ margin: 5 }} title={book.volumeInfo.title}>
        {book.volumeInfo.authors
          ? book.volumeInfo.authors.map(a => <p key={a}>By: {a}</p>)
          : null}
        <span>
          {book.volumeInfo.imageLinks ? (
            <img
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
            />
          ) : null}

          <p>{book.volumeInfo.description}.</p>
        </span>
        <Button.Group>
          <Button
            id={book.volumeInfo.industryIdentifiers[0].identifier}
            onClick={() => this.handleClick(currentUser.id, book)}
          >
            Save
          </Button>
          <Button>
            <a
              href={book.volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy
            </a>
          </Button>
        </Button.Group>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveUserBook: (userId, book) => dispatch(saveUserBook(userId, book))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(BookCard);
