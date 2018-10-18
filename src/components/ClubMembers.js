import React from "react";
import { List, Avatar, Col, Row } from "antd";

const ClubMembers = ({ club, currentUser }) => {
  return (
    <div>
      <h2>Members</h2>
      <List grid={{ gutter: 16, xs: 3, sm: 5, md: 6, lg: 6 }}>
        {club.users.filter(u => u.id !== currentUser.id).map(user => (
          <List.Item key={user.id}>
            <List.Item.Meta
              avatar={<Avatar src={user.picture} />}
              title={user.name}
            />
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default ClubMembers;
