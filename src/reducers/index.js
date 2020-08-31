import { combineReducers } from "redux";
import * as constants from "../constants/constants";

export const database = (state = {}, action) => {
  switch (action.type) {
    case constants.DATABASE:
      return action.database;
    case constants.PIN_RESULT:
      state[action.result.id].pinned = true;
      return state;
    case constants.UNPIN_RESULT:
      state[action.result.id].pinned = false;
      return state;
    case constants.DELETE_RESULT:
      state[action.id].deleted = true;
      return state;
    default:
      return state;
  }
};

export const results = (state = [], action) => {
  let resultToUpdate;
  switch (action.type) {
    case constants.SEARCH_RESULTS:
      return action.results;
    case constants.PIN_RESULT:
      resultToUpdate = state.filter((result) => result.id === action.result.id);
      if (resultToUpdate.length > 0) {
        resultToUpdate[0].pinned = true;
      }
      return [...state];
    case constants.UNPIN_RESULT:
      resultToUpdate = state.filter((result) => result.id === action.result.id);
      if (resultToUpdate.length > 0) {
        resultToUpdate[0].pinned = false;
      }
      return [...state];
    case constants.ADD_TAGS:
      resultToUpdate = state.filter((result) => result.id === action.id);
      if (resultToUpdate.length > 0) {
        const tags = action.tags.filter(
          (tag) => !resultToUpdate[0].data.matching_terms.includes(tag)
        );
        resultToUpdate[0].data.matching_terms.push(...tags);
      }
      return [...state];
    case constants.DELETE_RESULT:
      resultToUpdate = state.filter((result) => result.id === action.id);
      if (resultToUpdate.length > 0) {
        resultToUpdate[0].deleted = true;
      }
      return [...state];
    default:
      return state;
  }
};

export const selectedCategory = (state = constants.ALL, action) => {
  switch (action.type) {
    case constants.SELECTED_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

export const pinnedResults = (state = [], action) => {
  switch (action.type) {
    case constants.PIN_RESULT:
      action.result.pinned = true;
      state.push(action.result);
      return state;
    case constants.UNPIN_RESULT:
      return state.filter((result) => result.id !== action.result.id);
    case constants.DELETE_RESULT:
      return state.filter((result) => result.id !== action.id);
    default:
      return state;
  }
};

const allReducers = combineReducers({
  results,
  selectedCategory,
  pinnedResults,
  database,
});

export default allReducers;
