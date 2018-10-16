import React from "react";
import { List, Avatar, Icon, Button } from "antd";

const ClubBooks = props => {
  console.log(props);
  return (
    <div>
      <h2>Vote for a book</h2>
      <List>
        {props.club.group_books.map(book => (
          <List.Item
            key={book.id}
            actions={[<Button id={book.id}>Vote</Button>]}
          >
            <List.Item.Meta
              avatar={<Avatar src={book.image} />}
              title={book.title}
              description="Votes"
            />
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default ClubBooks;
