import React from "react";
import { connect } from "react-redux";
import { makeOrGetUser, createGroup } from "../redux/actions";
import { Card, Layout, Collapse, Form, Input, Button, Select } from "antd";
const { Content } = Layout;
const Panel = Collapse.Panel;

class UserInfo extends React.Component {
  state = {
    nameValue: "",
    selectedGroupId: null
  };

  componentDidMount() {
    this.props.makeOrGetUser(this.props.user);
  }

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
    console.log(this.state.selectedGroupId);
  };

  render() {
    return (
      <Content>
        <Card
          style={{ width: "50%", margin: "1em" }}
          title={this.props.currentUser.name}
        >
          <img
            alt={this.props.currentUser.name}
            src={this.props.currentUser.picture}
          />
        </Card>
        <Collapse accordion>
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
      </Content>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    makeOrGetUser: user => dispatch(makeOrGetUser(user)),
    createGroup: name => dispatch(createGroup(name))
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    groups: state.groups
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
