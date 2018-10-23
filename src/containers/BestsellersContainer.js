import React from "react";
import { connect } from "react-redux";
import { Layout, Collapse } from "antd";
import BestsellerList from "../components/BestsellerList";
import { fetchBestsellers } from "../redux/actions";

class BestsellersContainer extends React.Component {
  componentDidMount() {
    this.props.fetchBestsellers();
  }

  render() {
    return (
      <Layout.Content style={{ padding: "1em" }}>
        <Collapse accordion bordered="false">
          <Collapse.Panel header="Hardcover Fiction">
            <BestsellerList list="hardcover-fiction" />
          </Collapse.Panel>
          <Collapse.Panel header="Hardcover Nonfiction">
            <BestsellerList list="hardcover-nonfiction" />
          </Collapse.Panel>
          <Collapse.Panel header="Trade Fiction Paperback">
            <BestsellerList list="trade-fiction-paperback" />
          </Collapse.Panel>
          <Collapse.Panel header="Paperback Nonfiction">
            <BestsellerList list="paperback-nonfiction" />
          </Collapse.Panel>
          <Collapse.Panel header="Young Adult">
            <BestsellerList list="young-adult" />
          </Collapse.Panel>
        </Collapse>
      </Layout.Content>
    );
  }
}

export default connect(
  null,
  { fetchBestsellers }
)(BestsellersContainer);
