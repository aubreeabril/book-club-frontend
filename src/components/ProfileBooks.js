import React from "react";
import { connect } from "react-redux";
import { deleteUserBook } from "../redux/actions";
import { List, Button, Avatar } from "antd";

class ProfileBooks extends React.Component {
  handleDelete = e => {
    this.props.deleteUserBook(e.target.id, this.props.currentUser.auth0sub);
  };

  render() {
    return (
      <div style={{ marginTop: "1em" }}>
        <h3>My Saved Books</h3>
        <List>
          {this.props.currentUser
            ? this.props.currentUser.user_books
              ? this.props.currentUser.user_books.map(book => (
                  <List.Item
                    key={book.isbn}
                    actions={[
                      <Button id={book.id} onClick={this.handleDelete}>
                        Delete
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={book.image} />}
                      title={book.title}
                      description={book.author}
                    />
                  </List.Item>
                ))
              : null
            : this.props.history.push("/")}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { deleteUserBook }
)(ProfileBooks);
