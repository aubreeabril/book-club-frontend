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
        <h2>My Saved Books</h2>
        <List itemLayout="vertical">
          {this.props.currentUser
            ? this.props.currentUser.user_books
              ? this.props.currentUser.user_books.map(book => (
                  <List.Item
                    extra={
                      <img width={100} src={book.image} alt={book.title} />
                    }
                    key={book.isbn}
                    actions={[
                      <React.Fragment>
                        <Button id={book.id} onClick={this.handleDelete}>
                          Delete
                        </Button>
                        <a
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button>Buy</Button>
                        </a>
                      </React.Fragment>
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
