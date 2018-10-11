import React from "react";
import { Card, Button } from "antd";

const BookCard = ({ book }) => {
  return (
    <Card
      style={{ margin: 5 }}
      // cover={
      //   <img
      //     src={book.volumeInfo.imageLinks.thumbnail}
      //     alt={book.volumeInfo.title}
      //   />
      // }
      title={book.volumeInfo.title}
    >
      {book.volumeInfo.authors.map(a => (
        <p>By: {a}</p>
      ))}
      <img
        src={book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
        style={{ "text-align": "center" }}
      />
      <p>{book.volumeInfo.description.split(". ").slice(0, 2)}.</p>
      <Button id={book.volumeInfo.industryIdentifiers[0].identifier}>
        Save
      </Button>
    </Card>
  );
};

export default BookCard;
