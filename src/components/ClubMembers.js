import React from "react";
import { List, Avatar } from "antd";

const ClubMembers = ({ club, currentUser }) => {
  return (
    <div>
      <h2>Members</h2>
      <List>
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
