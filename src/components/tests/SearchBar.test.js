import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import SearchBar from "../SearchBar";
import { testStore, mockedStore, findByTestAttr, mockDatabase } from "./Utils";
import * as constants from "../../constants/constants";

const setup = () => {
  let state = {
    results: [],
    pinnedResults: [],
    database: mockDatabase,
    selectedCategory: constants.ALL,
  };
  const store = mockedStore(state);
  return mount(
    <Provider store={store}>
      <SearchBar />
    </Provider>
  );
};

const setupWithData = () => {
  const store = testStore();
  return [
    store,
    mount(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    ),
  ];
};

describe("Searchbar Component", () => {
  const component = setup();
  it("should render without errors", () => {
    expect(findByTestAttr(component, "search-container").length).toEqual(1);
    expect(findByTestAttr(component, "search-button").length).toEqual(1);
    expect(findByTestAttr(component, "search-input").length).toEqual(1);
  });
});

describe("Searchbar Component: test searches", () => {
  const [store, component] = setupWithData();
  it("should update results with matching term: 'dave'", () => {
    findByTestAttr(component, "search-input").simulate("change", {
      target: { value: "   dAVe  " },
    });
    findByTestAttr(component, "search-button").simulate("click");
    expect(store.getState().results.length).toEqual(1);
    expect(store.getState().results[0].id).toEqual("0");
  });

  it("should update results with matching term: 'dave and acme, SORTED on number of matching terms'", () => {
    findByTestAttr(component, "search-input").simulate("change", {
      target: { value: "   dave acme  " },
    });
    findByTestAttr(component, "search-button").simulate("click");
    expect(store.getState().results.length).toEqual(3);
    expect(store.getState().results[0].id).toEqual("0");
  });
});
