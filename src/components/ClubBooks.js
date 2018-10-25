import React from "react";
import { connect } from "react-redux";
import { createVote, removeNominatedBook } from "../redux/actions";
import { List, Button, Divider, Tabs } from "antd";

class ClubBooks extends React.Component {
  state = {
    update: false
  };

  handleClick = e => {
    this.props.createVote(this.props.currentUser.id, e.target.id);
    this.setState({
      update: true
    });
  };

  handleRemoveNom = e => {
    this.props.removeNominatedBook(e.target.id);
  };

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="1" size="large">
          <Tabs.TabPane tab="Vote" key="1">
            <List
              itemLayout="vertical"
              grid={{ xs: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
              style={{ overflow: "auto", height: "220px" }}
            >
              {this.props.groupBooks
                .filter(
                  gb => gb.group_id === this.props.club.id && gb.read === false
                )
                .map(book => (
                  <React.Fragment key={book.id}>
                    <List.Item
                      style={{ margin: "10px" }}
                      extra={
                        <img height={150} alt={book.title} src={book.image} />
                      }
                      key={book.id}
                      actions={[
                        this.props.currentUser.votes
                          .map(v => v.group_book_id)
                          .includes(book.id) ? (
                          <React.Fragment>
                            <Button
                              id={book.id}
                              disabled
                              onClick={this.handleClick}
                            >
                              Vote
                            </Button>
                            <Button id={book.id} onClick={this.handleRemoveNom}>
                              Remove
                            </Button>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Button id={book.id} onClick={this.handleClick}>
                              Vote
                            </Button>
                            <Button id={book.id} onClick={this.handleRemoveNom}>
                              Remove
                            </Button>
                          </React.Fragment>
                        )
                      ]}
                    >
                      <List.Item.Meta
                        title={book.title}
                        description={book.author}
                      />
                      {`Votes: ${book.votes ? book.votes.length : "0"}`}
                    </List.Item>
                    <Divider />
                  </React.Fragment>
                ))}
            </List>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Past books" key="2">
            <List
              itemLayout="vertical"
              grid={{ xs: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
              style={{ overflow: "auto", height: "400px" }}
            >
              {this.props.groupBooks
                .filter(
                  gb => gb.group_id === this.props.club.id && gb.read === true
                )
                .map(book => (
                  <React.Fragment key={book.id}>
                    <List.Item
                      style={{ margin: "10px" }}
                      extra={
                        <img height={150} alt={book.title} src={book.image} />
                      }
                      key={book.id}
                    >
                      <List.Item.Meta
                        title={book.title}
                        description={book.author}
                      />
                      {`Votes: ${book.votes ? book.votes.length : "0"}`}
                    </List.Item>
                    <Divider />
                  </React.Fragment>
                ))}
            </List>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    groupBooks: state.groupBooks,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { createVote, removeNominatedBook }
)(ClubBooks);
