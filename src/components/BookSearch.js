import React from "react";
import { Form, Input } from "antd";

class BookSearch extends React.Component {
  state = {
    searchValue: ""
  };

  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleSubmit = value => {
    console.log(value);
    this.setState({
      searchValue: ""
    });
  };

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Item>
          <Input.Search
            placeholder="Find a book by title"
            enterButton
            onChange={this.handleChange}
            onSearch={value => this.handleSubmit(value)}
            value={this.state.searchValue}
          />
        </Form.Item>
      </Form>
    );
  }
}

export default BookSearch;
