import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";
import { setMeeting, addGroupBook } from "../redux/actions";
import { Layout, DatePicker, Form, Select, Button, Alert } from "antd";
import ClubMembers from "./ClubMembers";
import ClubBooks from "./ClubBooks";

class ClubInfo extends React.Component {
  state = {
    meeting: null,
    selectedBook: null
  };

  componentDidMount() {
    if (this.props.club.next_meeting) {
      this.setState({
        meeting: moment(this.props.club.next_meeting).format(
          "dddd, MMM DD, hh:mm a"
        )
      });
    }
  }

  handleChange = (value, event) => {
    this.setState({
      selectedBook: {
        title: event.props.title,
        author: event.props.author,
        isbn: event.props.isbn,
        image: event.props.image
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (
      !this.props.groupBooks
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
    this.setState({
      meeting: moment(value).format("dddd, MMM DD, hh:mm a")
    });
    this.props.setMeeting(this.props.club.id, meeting);
  };

  render() {
    const { club, currentUser } = this.props;

    const winningBook = this.props.groupBooks.find(
      b => b.id === parseInt(club.current_book, 10)
    );

    return (
      <Layout.Content>
        <h3>
          Next Meeting:{" "}
          {!!this.state.meeting ? (
            this.state.meeting
          ) : (
            <DatePicker
              placeholder="pick date and time"
              showTime={{ format: "hh:mm" }}
              format="YYYY-MM-DD hh:mm"
              onOk={this.handleOk}
            />
          )}
        </h3>
        <h3>
          Current Book:{" "}
          {!!club.current_book && this.props.groupBooks ? (
            winningBook.title
          ) : (
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
          )}
        </h3>
        <ClubMembers club={club} {...this.props} />
        <ClubBooks club={club} />
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
    { setMeeting, addGroupBook }
  )(ClubInfo)
);
