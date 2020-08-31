import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setResults } from "../actions/index";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const database = useSelector((state) => state.database);
  const ids = Object.keys(database);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const allSearchResults = [];

    let searchTerms = searchTerm.split(" ");
    searchTerms = searchTerms.map((term) => term.toLowerCase());

    ids.forEach((id) => {
      const entry = database[id];
      const matches = getNumberOfMatchingTerm(
        entry.data.matching_terms,
        searchTerms
      );
      if (matches > 0) {
        allSearchResults.push({
          id,
          ...entry,
          matchingTerms: matches,
        });
      }
    });
    allSearchResults.sort((a, b) =>
      a.matchingTerms < b.matchingTerms ? 1 : -1
    );
    dispatch(setResults(allSearchResults));
  };

  const getNumberOfMatchingTerm = (matchingTerms, searchTerms) => {
    let count = 0;
    searchTerms.forEach((term) => {
      if (matchingTerms.includes(term)) count++;
    });
    return count;
  };

  const onKeyDown = ({ key }) => {
    if (key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="search-container">
      <input
        className="input search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button className="button search-button" onClick={handleSearch}>
        Enter
      </button>
    </div>
  );
};

export default SearchBar;
