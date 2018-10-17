import React from "react";
import { Input } from "antd";

class Chat extends React.Component {
  render() {
    return (
      <div>
        <h3>Chat</h3>
        <Input placeholder="type something" />
      </div>
    );
  }
}

export default Chat;
