import React from "react";
import { Provider } from "react-redux";

import { mount } from "enzyme";
import CategorySelector from "../CategorySelector";

import {
  testStore,
  mockedStore,
  findByTestAttr,
  findByTestCategory,
} from "./Utils";

const setup = () => {
  const store = mockedStore();
  return mount(
    <Provider store={store}>
      <CategorySelector />
    </Provider>
  );
};

const setupTestStore = () => {
  const store = testStore();
  return [
    store,
    mount(
      <Provider store={store}>
        <CategorySelector />
      </Provider>
    ),
  ];
};

describe("CategorySelector Component", () => {
  const component = setup();
  it("should render without errors", () => {
    expect(findByTestAttr(component, "category-selector").length).toEqual(1);
  });
  it("should render 5 categories", () => {
    expect(findByTestAttr(component, "category-button").length).toEqual(6);
  });
});

describe("CategorySelector Component: test selecting category", () => {
  const [store, component] = setupTestStore();
  it("should set selected category to calendar", () => {
    findByTestCategory(component, "calendar").simulate("click");
    expect(store.getState().selectedCategory).toEqual("CALENDAR");
  });
});
