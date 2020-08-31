import React, { useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import CatergorySelector from "./components/CategorySelector";
import { useDispatch } from "react-redux";
import calendarData from "./data/calendar.json";
import contactData from "./data/contacts.json";
import dropboxData from "./data/dropbox.json";
import slackData from "./data/slack.json";
import tweetData from "./data/tweet.json";
import { setDatabase } from "./actions/index";

function App() {
  const datasets = [
    calendarData,
    contactData,
    dropboxData,
    slackData,
    tweetData,
  ];
  const dispatch = useDispatch();

  //load data
  useEffect(() => {
    let id = 0;
    const database = {};
    datasets.forEach((dataset) => {
      const key = Object.keys(dataset)[0];
      dataset[key].forEach((data) => {
        database[id] = {
          category: key.toUpperCase(),
          pinned: false,
          deleted: false,
          data,
        };
        id++;
      });
    });

    dispatch(setDatabase(database));
  }, []);

  return (
    <div className="app-container">
      <div>
        <p id="logo">ACME SEARCH</p>
      </div>
      <SearchBar />
      <CatergorySelector />
      <Results />
    </div>
  );
}

export default App;
