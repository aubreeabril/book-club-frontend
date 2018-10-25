import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";
import {
  setMeeting,
  addGroupBook,
  setClubBook,
  clearBookClubDate,
  clearGroupVotes
} from "../redux/actions";
import { Layout, DatePicker, Form, Select, Button, Alert, List } from "antd";
import ClubMembers from "./ClubMembers";
import ClubBooks from "./ClubBooks";
// import { ActionCable } from "react-actioncable-provider";
// import Cable from "./Cable";

class ClubInfo extends React.Component {
  state = {
    meeting: null,
    selectedBook: null,
    vote_by: null
  };

  componentDidMount() {
    // handling meeting date and vote by date
    let now = moment();
    if (now > moment(this.props.club.next_meeting)) {
      this.props.clearBookClubDate(
        this.props.club.id,
        this.props.club.current_book
      );
    } else if (
      this.props.club.next_meeting
      // moment() > moment(this.props.club.next_meeting)
    ) {
      this.setState({
        meeting: moment(this.props.club.next_meeting).format("MMM DD, hh:mm a"),
        vote_by: moment(this.props.club.vote_by).format("MMM DD, hh:mm a")
      });
    }
    // is there a winning book?
    const winningBook = this.props.groupBooks.find(
      b => b.id === parseInt(this.props.club.current_book, 10)
    );
    this.setState({
      selectedBook: winningBook
    });

    // if there's no winning book && the vote_by date has passed, find the winning book
    if (!winningBook && this.props.club.vote_by) {
      if (!winningBook && moment() > moment(this.props.club.vote_by)) {
        let votes = this.props.club.votes.map(vote => vote.group_book_id);

        let count = votes.reduce((tallyObj, vote) => {
          tallyObj[vote] = (tallyObj[vote] || 0) + 1;
          return tallyObj;
        }, {});

        let numOfWinningVotes = Math.max(...Object.values(count));
        let bookId = Object.keys(count, numOfWinningVotes).find(
          key => count[key] === numOfWinningVotes
        );

        let newWinningBook = this.props.groupBooks.find(
          gb => gb.id === parseInt(bookId)
        );

        // this.setState({
        //   selectedBook: this.props.newWinningBook
        // });
        this.props.setClubBook(this.props.club.id, newWinningBook.id);
        this.props.clearGroupVotes(this.props.club.id);
      }
    }
  }

  handleChange = (value, event) => {
    this.setState({
      selectedBook: {
        title: event.props.title,
        author: event.props.author,
        isbn: event.props.isbn,
        image: event.props.image,
        description: event.props.description,
        link: event.props.link
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (
      !this.props.club.group_books
        .map(gb => gb.isbn)
        .includes(this.state.selectedBook.isbn)
    ) {
      this.props.addGroupBook(this.props.club.id, this.state.selectedBook);
    } else {
      ReactDOM.render(
        <Alert
          closable
          type="error"
          message="This book has already been nominated"
        />,
        document.getElementById("for-error")
      );
    }
  };

  handleOk = value => {
    let meeting = value;
    let voteBy = moment(value).subtract(1, "months");
    console.log(meeting, voteBy);
    this.setState({
      meeting: moment(value).format("dddd, MMM DD, hh:mm a"),
      vote_by: moment(value)
        .subtract(1, "months")
        .format("dddd, MM DD, hh:mm a")
    });
    this.props.setMeeting(this.props.club.id, meeting, voteBy);
  };

  disabledDate(current) {
    return current && current < moment();
  }

  render() {
    const { club, currentUser } = this.props;

    const winningBook = this.props.groupBooks.find(
      b => b.id === parseInt(club.current_book, 10)
    );

    // if (!winningBook) {
    //   console.log(this.props.club);
    //
    // }

    return (
      <Layout.Content>
        <ClubMembers club={club} {...this.props} />
        <List itemLayout="vertical" style={{ paddingTop: "1em" }}>
          <List.Item style={{ margin: "5px" }}>
            <List.Item.Meta
              title="Next Meeting"
              description={
                !!this.state.meeting ? (
                  <strong>{this.state.meeting}</strong>
                ) : (
                  <DatePicker
                    style={{ maxWidth: "150px" }}
                    disabledDate={this.disabledDate}
                    placeholder="Date"
                    showTime={{ format: "hh:mm" }}
                    format="YYYY-MM-DD hh:mm"
                    onOk={this.handleOk}
                  />
                )
              }
            />
          </List.Item>
          <List.Item
            style={{ margin: "5px" }}
            extra={
              club.current_book ? (
                <img width={100} src={winningBook.image} alt="book cover" />
              ) : null
            }
            actions={
              winningBook
                ? [
                    <Button>
                      <a
                        href={winningBook.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Buy
                      </a>
                    </Button>
                  ]
                : null
            }
          >
            {!!club.current_book && this.props.groupBooks ? (
              <List.Item.Meta
                title={!!club.current_book ? winningBook.title : `Next Book`}
                description={winningBook.author}
              />
            ) : (
              <React.Fragment>
                <List.Item.Meta
                  title="Next Book"
                  description={
                    <Form onSubmit={this.handleSubmit}>
                      <Select
                        placeholder="nominate a book"
                        onChange={this.handleChange}
                        defaultValue="nominate a book"
                      >
                        {currentUser.user_books
                          ? currentUser.user_books.map(book => (
                              <Select.Option
                                title={book.title}
                                author={book.author}
                                image={book.image}
                                description={book.description}
                                link={book.link}
                                isbn={book.isbn}
                                key={book.isbn}
                              >
                                {book.title}
                              </Select.Option>
                            ))
                          : null}
                      </Select>
                      <Button htmlType="submit">Submit</Button>
                      <div id="for-error" />
                    </Form>
                  }
                />
              </React.Fragment>
            )}
            {!club.current_book && this.state.vote_by ? (
              <Alert
                type="success"
                message={`Vote or nominate a book by ${this.state.vote_by}!`}
              />
            ) : null}
          </List.Item>
        </List>

        {!this.props.club.current_book ? <ClubBooks club={club} /> : null}
      </Layout.Content>
    );
  }
}

const mapStateToProps = state => {
  return {
    groupBooks: state.groupBooks
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      setMeeting,
      addGroupBook,
      setClubBook,
      clearBookClubDate,
      clearGroupVotes
    }
  )(ClubInfo)
);
