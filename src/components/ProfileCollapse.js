import React from "react";
import { connect } from "react-redux";
import { Input, Collapse, Form, Select, Button } from "antd";
import {
  createGroup,
  createUserGroup,
  fetchGroupBooks
} from "../redux/actions";

const Panel = Collapse.Panel;

class ProfileCollapse extends React.Component {
  state = {
    nameValue: "",
    selectedGroupId: null,
    user: ""
  };

  handleChange = e => {
    this.setState({
      nameValue: e.target.value
    });
  };

  handleSelectChange = (value, event) => {
    this.setState({
      selectedGroupId: event.key
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createGroup(this.state.nameValue);
    this.setState({
      nameValue: ""
    });
  };

  handleSelectSubmit = e => {
    e.preventDefault();

    this.props.createUserGroup(
      this.state.selectedGroupId,
      this.props.currentUser.id,
      this.props.currentUser.auth0sub
    );
  };

  render() {
    return (
      <Collapse accordion style={{ margin: "1em" }}>
        <Panel header="Join a book club" key="1">
          <Form onSubmit={this.handleSelectSubmit}>
            <Form.Item>
              <Select
                placeholder="Select a club"
                onChange={this.handleSelectChange}
              >
                {this.props.groups.map(group => (
                  <Select.Option value={group.name} key={group.id}>
                    {group.name}
                  </Select.Option>
                ))}
              </Select>
              <Button htmlType="submit">Join</Button>
            </Form.Item>
          </Form>
        </Panel>
        <Panel header="Create new book club" key="2">
          <Form onSubmit={this.handleSubmit} layout="inline">
            <Form.Item>
              <Input
                placeholder="group name"
                value={this.state.nameValue}
                onChange={this.handleChange}
              />
              <Button htmlType="submit">Create</Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    groups: state.groups,
    groupBooks: state.groupBooks
  };
};

export default connect(
  mapStateToProps,
  { createGroup, createUserGroup, fetchGroupBooks }
)(ProfileCollapse);
