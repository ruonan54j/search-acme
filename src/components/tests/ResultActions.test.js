import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { testStore, mockedStore, findByTestAttr } from "./Utils";
import * as constants from "../../constants/constants";
import ResultActions from "../ResultActions";
import { setResults } from "../../actions";

const ID = "1";
const setup = () => {
  let state = {
    results: [],
    pinnedResults: [],
    database: {},
    selectedCategory: constants.ALL,
  };
  const store = mockedStore(state);
  return mount(
    <Provider store={store}>
      <ResultActions result={{ id: ID, pinned: true }} />
    </Provider>
  );
};

const setupTestStore = (result) => {
  const store = testStore();
  return [
    store,
    mount(
      <Provider store={store}>
        <ResultActions result={result} />
      </Provider>
    ),
  ];
};

describe("ResultActions Component", () => {
  const component = setup();
  it("should render without errors", () => {
    expect(findByTestAttr(component, "result-actions").length).toEqual(1);
    expect(findByTestAttr(component, "pin").length).toEqual(1);
    expect(findByTestAttr(component, "tag").length).toEqual(1);
    expect(findByTestAttr(component, "delete").length).toEqual(1);
  });

  it("should not render tag modal in initial state", () => {
    expect(findByTestAttr(component, "tag-modal").length).toEqual(0);
  });

  it("should render tag modal when tag icon is clicked", () => {
    findByTestAttr(component, "tag").simulate("click");
    expect(findByTestAttr(component, "tag-modal").length).toEqual(1);
  });
});

describe("ResultActions Component: test action clicks", () => {
  const result = {
    id: "2",
    category: "DROPBOX",
    pinned: false,
    deleted: false,
    data: {
      id: "12345",
      path: "/taxes/2016/w2-acme.pdf",
      title: '"2016 W2"',
      shared_with: ["jane@accountants.com", "spouse@family.org"],
      matching_terms: ["tax", "w2", "alice"],
      created: "2016-02-01",
    },
    matchingTerms: 2,
  };

  const [store, component] = setupTestStore(result);
  store.dispatch(setResults([result]));

  it("should pin post when pin action clicked", () => {
    expect(findByTestAttr(component, "pin").length).toEqual(1);
    findByTestAttr(component, "pin").simulate("click");
    expect(store.getState().database[result.id].pinned).toEqual(true);
    expect(store.getState().results[0].pinned).toEqual(true);
    //upin
    findByTestAttr(component, "pin").simulate("click");
    expect(store.getState().database[result.id].pinned).toEqual(false);
    expect(store.getState().results[0].pinned).toEqual(false);
  });

  it("should delete post when delete action clicked", () => {
    const confirmSpy = jest.spyOn(window, "confirm");
    confirmSpy.mockImplementation(jest.fn(() => true));

    expect(findByTestAttr(component, "delete").length).toEqual(1);
    findByTestAttr(component, "delete").simulate("click");
    expect(store.getState().database[result.id].deleted).toEqual(true);
    expect(store.getState().results[0].deleted).toEqual(true);
  });
});
