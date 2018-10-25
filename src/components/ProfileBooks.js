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
      <div style={{ marginTop: "1em", marginLeft: "1em", overflow: "hidden" }}>
        <h2>My Saved Books</h2>
        <List
          style={{ overflow: "auto", height: "300px" }}
          itemLayout="vertical"
          grid={{ xs: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
        >
          {this.props.currentUser
            ? this.props.currentUser.user_books
              ? this.props.currentUser.user_books.map(book => (
                  <List.Item
                    style={{ margin: "10px" }}
                    extra={
                      <img
                        height={150}
                        width={100}
                        src={book.image}
                        alt={book.title}
                      />
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
