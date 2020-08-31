import configureMockStore from "redux-mock-store";
import allReducers from "../../reducers";
import { createStore } from "redux";
import { setDatabase } from "../../actions";

export const mockedStore = (state) => {
  const mockStore = configureMockStore([]);
  return mockStore(state);
};

export const testStore = () => {
  const store = createStore(allReducers);
  store.dispatch(setDatabase(mockDatabase));
  return store;
};

export const findByTestAttr = (component, attr) => {
  return component.find(`[data-test='${attr}']`);
};

export const findByTestCategory = (component, category) => {
  return component.find(`[data-test-category='${category}']`);
};

export const mockResultsCategoryCount = {
  CALENDAR: 1,
  CONTACTS: 1,
  TWEET: 1,
  SLACK: 1,
  DROPBOX: 1,
};

export const mockResults = [
  {
    id: "4",
    category: "CALENDAR",
    pinned: false,
    deleted: false,
    data: {
      id: "12348",
      title: "Acme Planning",
      invitees: "dave, john, rj, alice",
      matching_terms: ["dave", "jake", "rj", "alice", "acme"],
      date: "2020-08-29 12:00:00",
    },
    matchingTerms: 1,
  },
  {
    id: "6",
    category: "CONTACTS",
    pinned: false,
    deleted: false,
    data: {
      id: "31456",
      name: "Robert Roe",
      company: "Acme Inc",
      emails: ["bob@acme.co"],
      phones: ["+44 171 6666 5555"],
      matching_terms: ["acme", "robert", "roe", "bob"],
      last_contact: "2019-02-29",
    },
  },
  {
    id: "11",
    category: "DROPBOX",
    pinned: false,
    deleted: false,
    data: {
      id: "3456789",
      path: "/work/customers/acme/proposal.docx",
      title: '"ACME Corp: Draft MoU"',
      shared_with: ["acme-accounts@mycompany.com"],
      matching_terms: ["acme", "proposal", "mou"],
      created: "2019-01-19",
    },
    matchingTerms: 1,
  },
  {
    id: "20",
    category: "TWEET",
    pinned: false,
    deleted: false,
    data: {
      user: "@acmecorp",
      message: "We're no longer hiring in Timbuktu",
      timestamp: "2019-02-27",
      matching_terms: ["acme", "hiring", "timbuktu"],
    },
    matchingTerms: 1,
  },
  {
    id: "18",
    category: "SLACK",
    pinned: false,
    deleted: false,
    data: {
      id: "22347",
      channel: "customer-chatter",
      author: "dave",
      message: "I think John from Acme was in that meeting too",
      timestamp: "2019-02-26 12:00:02",
      matching_terms: ["dave", "john", "acme"],
    },
    matchingTerms: 1,
  },
];

export const mockDatabase = {
  0: {
    category: "CALENDAR",
    pinned: false,
    deleted: false,
    data: {
      id: "12345",
      title: "Acme Proposal Meeting",
      invitees: "dave, john, bob, carol",
      matching_terms: ["dave", "john", "bob", "carol", "acme"],
      date: "2019-01-10 10:00:00",
    },
  },
  1: {
    category: "CONTACTS",
    pinned: false,
    deleted: false,
    data: {
      id: "12345",
      name: "John Doe",
      company: "Acme Inc",
      emails: ["john@acme.co", "doe@gmail.com"],
      phones: ["650-555-5555", "+44 171 5555 5555"],
      matching_terms: ["acme", "john", "john doe"],
      last_contact: "2019-02-26",
    },
  },
  2: {
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
  },
  3: {
    category: "SLACK",
    pinned: false,
    deleted: false,
    data: {
      id: "12345",
      channel: "chatter",
      author: "alice",
      message: "Who's up for lunch right now?",
      timestamp: "2019-02-26 11:00:00",
      matching_terms: ["alice", "chatter", "lunch"],
    },
  },
  4: {
    category: "TWEET",
    pinned: false,
    deleted: false,
    data: {
      user: "@acmecorp",
      message: "We're hiring in Boston!",
      timestamp: "2019-02-29",
      matching_terms: ["acme", "hiring", "boston"],
    },
  },
};
