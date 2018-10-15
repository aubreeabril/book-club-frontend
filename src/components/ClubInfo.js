import React from "react";
import { Layout } from "antd";

class ClubInfo extends React.Component {
  render() {
    const { club, currentUser } = this.props;
    return (
      <Layout.Content>
        <h2>
          Next Meeting:{" "}
          {!!club.next_meeting ? club.next_meeting : "Pick a date"}
        </h2>
      </Layout.Content>
    );
  }
}

export default ClubInfo;
