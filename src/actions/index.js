import {
  SEARCH_RESULTS,
  SELECTED_CATEGORY,
  DATABASE,
  PIN_RESULT,
  UNPIN_RESULT,
  ADD_TAGS,
  DELETE_TAG,
  DELETE_RESULT,
} from "../constants/constants";

export const setDatabase = (database) => {
  return {
    type: DATABASE,
    database,
  };
};

export const setResults = (results) => {
  return {
    type: SEARCH_RESULTS,
    results,
  };
};

export const setSelectedCategory = (category) => {
  return {
    type: SELECTED_CATEGORY,
    category,
  };
};

export const pinResult = (result) => {
  return {
    type: PIN_RESULT,
    result,
  };
};

export const unpinResult = (result) => {
  return {
    type: UNPIN_RESULT,
    result,
  };
};

export const addTags = (id, tags) => {
  return {
    type: ADD_TAGS,
    id,
    tags,
  };
};

export const deleteTag = (id, tag) => {
  return {
    type: DELETE_TAG,
    id,
    tag,
  };
};

export const deleteResult = (id) => {
  return {
    type: DELETE_RESULT,
    id,
  };
};
