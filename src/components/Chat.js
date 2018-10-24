import React from "react";
import { connect } from "react-redux";
import { Input, List, Avatar } from "antd";
import { createMessage, fetchMessages } from "../redux/actions";
// import actionCable from "actioncable";

// let myInterval;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  componentDidMount() {
    // this.scrollToBottom();
    // myInterval = setInterval(() => {
    //   this.props.fetchMessages();
    // }, 5000);
  }
  //
  // componentWillUnmount() {
  //   // clearInterval(myInterval);
  // }
  //
  // // componentWillMount() {
  // //   this.createSocket();
  // // }
  //
  // componentDidUpdate() {
  //   // this.scrollToBottom();
  // }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  handleChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  handleEnter = e => {
    this.props.createMessage(
      this.props.currentUser.id,
      this.props.club.id,
      this.state.inputValue
    );

    this.setState({
      inputValue: ""
    });
  };

  render() {
    this.props.fetchMessages(this.props.club.id);

    return (
      <div>
        {this.props.chatMessages.length > 1 ? (
          <React.Fragment>
            <List style={{ elementOverflow: "hidden" }}>
              {this.props.chatMessages
                ? this.props.chatMessages.map(message => (
                    <React.Fragment>
                      <List.Item
                        key={message.id}
                        style={
                          message.user_id === this.props.currentUser.id
                            ? { float: "right" }
                            : null
                        }
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={
                                this.props.users.find(
                                  u => u.id === message.user_id
                                ).picture
                              }
                            />
                          }
                          description={message.text}
                        />
                      </List.Item>
                      <div style={{ clear: "both" }} />
                    </React.Fragment>
                  ))
                : null}
            </List>

            <Input
              placeholder="type something"
              value={this.state.inputValue}
              onChange={this.handleChange}
              onPressEnter={this.handleEnter}
            />
            <div ref={el => (this.messagesEnd = el)} />
          </React.Fragment>
        ) : (
          "Loading ..."
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    chatMessages: state.chatMessages,
    currentGroup: state.currentGroup,
    currentUser: state.currentUser,
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { createMessage, fetchMessages }
)(Chat);
