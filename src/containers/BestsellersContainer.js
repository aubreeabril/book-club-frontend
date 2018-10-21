import React from "react";
import { Layout, Collapse } from "antd";
import BestsellerList from "../components/BestsellerList";

class BestsellersContainer extends React.Component {
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
          <Collapse.Panel header="Mass Market Paperback">
            <BestsellerList list="mass-market-paperback" />
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

export default BestsellersContainer;
