import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import Results from "../Results";
import * as constants from "../../constants/constants";
import {
  mockedStore,
  findByTestAttr,
  findByTestCategory,
  mockResults,
  mockResultsCategoryCount,
} from "./Utils";

const setupWithResults = (category = constants.ALL) => {
  let state = {
    results: mockResults,
    pinnedResults: [],
    selectedCategory: category,
  };
  const store = mockedStore(state);
  return mount(
    <Provider store={store}>
      <Results />
    </Provider>
  );
};

const setupWithPinnedResults = () => {
  let state = {
    results: [],
    pinnedResults: mockResults,
    selectedCategory: constants.ALL,
  };
  const store = mockedStore(state);
  return mount(
    <Provider store={store}>
      <Results />
    </Provider>
  );
};

const setupWithNoResults = () => {
  let state = {
    results: [],
    pinnedResults: [],
    selectedCategory: constants.ALL,
  };
  const store = mockedStore(state);
  return mount(
    <Provider store={store}>
      <Results />
    </Provider>
  );
};

describe("Results with results Component", () => {
  const component = setupWithResults();
  it("should render without errors", () => {
    const wrapper = findByTestAttr(component, "results-container");
    const results = findByTestAttr(component, "result");

    expect(wrapper.length).toEqual(1);
    expect(results.length).toEqual(5);
  });

  it("should render the right categories", () => {
    const calendarResults = findByTestCategory(component, "calendar");
    const contactsResults = findByTestCategory(component, "contacts");
    const dropboxResults = findByTestCategory(component, "dropbox");
    const tweetResults = findByTestCategory(component, "tweet");
    const slackResults = findByTestCategory(component, "slack");

    expect(calendarResults.length).toEqual(
      mockResultsCategoryCount["CALENDAR"]
    );
    expect(contactsResults.length).toEqual(
      mockResultsCategoryCount["CONTACTS"]
    );
    expect(dropboxResults.length).toEqual(mockResultsCategoryCount["DROPBOX"]);
    expect(tweetResults.length).toEqual(mockResultsCategoryCount["TWEET"]);
    expect(slackResults.length).toEqual(mockResultsCategoryCount["SLACK"]);
  });
});

describe("Results with pinned results Component", () => {
  const component = setupWithPinnedResults();
  it("should render without errors", () => {
    const wrapper = findByTestAttr(component, "results-container");
    const results = findByTestAttr(component, "pinned-result");

    expect(wrapper.length).toEqual(1);
    expect(results.length).toEqual(5);
  });

  it("should render the right categories", () => {
    const calendarResults = findByTestCategory(component, "calendar");
    const contactsResults = findByTestCategory(component, "contacts");
    const dropboxResults = findByTestCategory(component, "dropbox");
    const tweetResults = findByTestCategory(component, "tweet");
    const slackResults = findByTestCategory(component, "slack");

    expect(calendarResults.length).toEqual(
      mockResultsCategoryCount["CALENDAR"]
    );
    expect(contactsResults.length).toEqual(
      mockResultsCategoryCount["CONTACTS"]
    );
    expect(dropboxResults.length).toEqual(mockResultsCategoryCount["DROPBOX"]);
    expect(tweetResults.length).toEqual(mockResultsCategoryCount["TWEET"]);
    expect(slackResults.length).toEqual(mockResultsCategoryCount["SLACK"]);
  });
});

describe("Results with no results Component", () => {
  const component = setupWithNoResults();
  it("should render without errors", () => {
    const wrapper = findByTestAttr(component, "results-container");
    const noResults = findByTestAttr(component, "no-results");

    expect(wrapper.length).toEqual(1);
    expect(noResults.length).toEqual(1);
  });
});

describe("Results Component: test filtering for different categories", () => {
  const categories = [
    constants.CALENDAR,
    constants.CONTACTS,
    constants.DROPBOX,
    constants.SLACK,
    constants.TWEET,
  ];

  categories.forEach((category) => {
    it(`should render ${category} results`, () => {
      const component = setupWithResults(category);
      const results = findByTestAttr(component, "result");
      const categoryResults = findByTestCategory(
        component,
        category.toLowerCase()
      );

      expect(results.length).toEqual(1);
      expect(categoryResults.length).toEqual(1);
    });
  });
});
