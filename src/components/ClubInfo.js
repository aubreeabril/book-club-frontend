import React from "react";
import moment from "moment";
import { Layout, DatePicker } from "antd";

class ClubInfo extends React.Component {
  render() {
    const { club, currentUser } = this.props;
    return (
      <Layout.Content>
        <h2>
          Next Meeting:{" "}
          {!!club.next_meeting ? (
            club.next_meeting
          ) : (
            <DatePicker
              placeholder="pick date and time"
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          )}
        </h2>
      </Layout.Content>
    );
  }
}

export default ClubInfo;
