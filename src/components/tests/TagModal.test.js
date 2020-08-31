import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import TagModal from "../TagModal";
import { testStore, mockedStore, findByTestAttr } from "./Utils";
import * as constants from "../../constants/constants";
import { setResults } from "../../actions";

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
      <TagModal
        closeModal={() => {
          return;
        }}
        id={"2"}
      />
    </Provider>
  );
};

const setupTestStore = () => {
  const store = testStore();
  return [
    store,
    mount(
      <Provider store={store}>
        <TagModal
          closeModal={() => {
            return;
          }}
          id={"2"}
        />
      </Provider>
    ),
  ];
};

describe("TagModal Component", () => {
  const component = setup();
  it("should render without errors", () => {
    expect(findByTestAttr(component, "tag-modal").length).toEqual(1);
    expect(findByTestAttr(component, "tag-button").length).toEqual(1);
    expect(findByTestAttr(component, "tag-close-button").length).toEqual(1);
  });
});

describe("TagModal Component: test add tags", () => {
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

  it("should add tags to result", () => {
    findByTestAttr(component, "tag-input").simulate("change", {
      target: { value: "   dAVe, taxes, , YAY , yay, dave, dave, " },
    });
    findByTestAttr(component, "tag-button").simulate("click");
    const expectedTags = ["tax", "w2", "alice", "dave", "taxes", "yay"];
    expect(store.getState().results[0].data.matching_terms).toEqual(
      expectedTags
    );
  });
});
