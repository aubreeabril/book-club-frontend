import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store"; // Smart components

import Home from "../../src/components/Home.js";

describe("<Home />", () => {
  describe("render()", () => {
    test("renders the component", () => {
      const wrapper = shallow(<Home />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
