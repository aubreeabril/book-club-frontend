import React from "react";
import { Card, Button } from "antd";

const BookCard = ({ book }) => {
  return (
    <Card style={{ margin: 5 }} title={book.volumeInfo.title}>
      {book.volumeInfo.authors.map(a => (
        <p>By: {a}</p>
      ))}
      <img
        src={book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
        style={{ "text-align": "center" }}
      />
      <p>{book.volumeInfo.description}.</p>
      <Button id={book.volumeInfo.industryIdentifiers[0].identifier}>
        Save
      </Button>
    </Card>
  );
};

export default BookCard;
