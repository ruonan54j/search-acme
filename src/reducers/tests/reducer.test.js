import * as actions from "../../actions";
import { database, results, selectedCategory, pinnedResults } from "../index";
import * as constants from "../../constants/constants";

describe("Database reducer", () => {
  it("Should return default state", () => {
    const newState = database(undefined, {});
    expect(newState).toEqual({});
  });

  it("Show return database", () => {
    const mockDatabase = {
      test: "test",
    };
    const newState = database(undefined, actions.setDatabase(mockDatabase));
    expect(newState).toEqual(mockDatabase);
  });

  it("Show pin result id 1", () => {
    const mockDatabase = {
      1: {
        category: "CALENDAR",
        pinned: false,
        deleted: false,
        data: {},
      },
    };
    const newState = database(mockDatabase, actions.pinResult({ id: 1 }));
    expect(newState[1].pinned).toEqual(true);
  });

  it("Show unpin result id 1", () => {
    const mockDatabase = {
      1: {
        category: "CALENDAR",
        pinned: true,
        deleted: false,
        data: {},
      },
    };
    const newState = database(mockDatabase, actions.unpinResult({ id: 1 }));
    expect(newState[1].pinned).toEqual(false);
  });

  it("Show delete result id 1", () => {
    const mockDatabase = {
      1: {
        category: "CALENDAR",
        pinned: true,
        deleted: false,
        data: {},
      },
    };
    const newState = database(mockDatabase, actions.deleteResult(1));
    expect(newState[1].deleted).toEqual(true);
  });
});

describe("Results reducer", () => {
  it("Should return default state", () => {
    const newState = results(undefined, {});
    expect(newState).toEqual([]);
  });

  it("Should return search results", () => {
    const mockResults = ["test"];
    const newState = results([], actions.setResults(mockResults));
    expect(newState).toEqual(mockResults);
  });

  it("Should pin result with id 1", () => {
    const mockResult = {
      id: 1,
      category: "test",
      pinned: false,
      deleted: false,
      data: {},
    };
    const mockResults = [mockResult];
    const newState = results(mockResults, actions.pinResult(mockResult));
    expect(newState[0].pinned).toEqual(true);
  });

  it("Should unpin result with id 1", () => {
    const mockResult = {
      id: 1,
      category: "test",
      pinned: true,
      deleted: false,
      data: {},
    };
    const mockResults = [mockResult];
    const newState = results(mockResults, actions.unpinResult(mockResult));
    expect(newState[0].pinned).toEqual(false);
  });

  it("Should delete result with id 1", () => {
    const mockResult = {
      id: 1,
      category: "test",
      pinned: true,
      deleted: false,
      data: {},
    };
    const mockResults = [mockResult];
    const newState = results(mockResults, actions.deleteResult(1));
    expect(newState[0].pinned).toEqual(true);
  });

  it("Should add tags to result with id 1", () => {
    const mockResult = {
      id: 1,
      category: "test",
      pinned: true,
      deleted: false,
      data: {
        matching_terms: ["hi"],
      },
    };
    const mockResults = [mockResult];
    const tags = ["what", "is", "this"];
    const expectedTags = mockResult.data.matching_terms.concat(tags);
    const newState = results(mockResults, actions.addTags(1, tags));
    expect(newState[0].data.matching_terms).toEqual(expectedTags);
  });
});

describe("SelectedCategory reducer", () => {
  it("Should return default state", () => {
    const newState = selectedCategory(undefined, {});
    expect(newState).toEqual(constants.ALL);
  });

  it("Should change selected category to calendar", () => {
    const newState = selectedCategory(
      undefined,
      actions.setSelectedCategory(constants.CALENDAR)
    );
    expect(newState).toEqual(constants.CALENDAR);
  });
});

describe("PinnedResults reducer", () => {
  it("Should return default state", () => {
    const newState = pinnedResults(undefined, {});
    expect(newState).toEqual([]);
  });

  it("Should add result to pinned", () => {
    const mockResult = {
      id: 1,
      category: "test",
      pinned: false,
      deleted: false,
      data: {
        matching_terms: ["hi"],
      },
    };
    const newState = pinnedResults([], actions.pinResult(mockResult));
    mockResult.pinned = true;
    expect(newState).toEqual([mockResult]);
  });

  it("Should unpin result from pinned", () => {
    const mockResult = {
      id: 1,
      category: "test",
      pinned: false,
      deleted: false,
      data: {
        matching_terms: ["hi"],
      },
    };
    const newState = pinnedResults(
      [mockResult],
      actions.unpinResult(mockResult)
    );
    expect(newState).toEqual([]);
  });

  it("Should delete result from pinned", () => {
    const mockResult = {
      id: 1,
      category: "test",
      pinned: false,
      deleted: false,
      data: {
        matching_terms: ["hi"],
      },
    };
    const newState = pinnedResults([mockResult], actions.deleteResult(1));
    expect(newState).toEqual([]);
  });
});
