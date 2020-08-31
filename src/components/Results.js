import React from "react";
import { useSelector } from "react-redux";
import * as constants from "../constants/constants";
import { dateConverter } from "./Utils";
import ResultActions from "./ResultActions";
import calendarIcon from "../assets/calendar.png";
import contactIcon from "../assets/contact.png";
import dropboxIcon from "../assets/dropbox.png";
import slackIcon from "../assets/slack.png";
import tweetIcon from "../assets/twitter.png";
import pinColor from "../assets/security-pin-color.svg";
import tagColor from "../assets/tag-color.svg";

const Results = () => {
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const results = useSelector((state) => state.results);
  const pinnedResults = useSelector((state) => state.pinnedResults);
  const resultElements = [];
  const pinnedElements = [];

  const getElements = (resultList, pushFunction) => {
    const filterFunc =
      selectedCategory === constants.ALL
        ? () => true
        : (result) => result.category === selectedCategory;

    resultList.filter(filterFunc).forEach((result) => {
      switch (result.category) {
        case constants.CALENDAR:
          const calendarElement = getCalendarResultElement(result);
          pushFunction(calendarElement, result);
          break;
        case constants.CONTACTS:
          const contactElement = getContactsResultElement(result);
          pushFunction(contactElement, result);
          break;
        case constants.DROPBOX:
          const dropboxElement = getDropboxResultElement(result);
          pushFunction(dropboxElement, result);
          break;
        case constants.SLACK:
          const slackElement = getSlackResultElement(result);
          pushFunction(slackElement, result);
          break;
        case constants.TWEET:
          const tweetElement = getTweetResultElement(result);
          pushFunction(tweetElement, result);
          break;
        default:
      }
    });
  };

  const pushResultElement = (element, result) => {
    if (!result.pinned && !result.deleted) {
      resultElements.push(
        <div
          className="result"
          key={result.id}
          data-test="result"
          data-test-category={result.category.toLowerCase()}
        >
          <div className="row no-gutters">
            {element}
            <ResultActions result={result} />
          </div>
          <p className="tags">
            <img src={tagColor} alt="tags" className="icon" />
            {sanitzeMatchingTerms(result.data.matching_terms)}
          </p>
        </div>
      );
    }
  };

  const pushPinnedResultElement = (element, result) => {
    pinnedElements.push(
      <div
        className="result"
        key={result.id}
        data-test="pinned-result"
        data-test-category={result.category.toLowerCase()}
      >
        <div className="pinned-banner">
          <img src={pinColor} alt="pinned" className="icon" />
        </div>
        <div className="row no-gutters">
          {element}
          <ResultActions result={result} />
        </div>
        <p className="tags">
          <img src={tagColor} alt="tags" className="icon" />
          {sanitzeMatchingTerms(result.data.matching_terms)}
        </p>
      </div>
    );
  };

  const sanitzeMatchingTerms = (matchingTerms) => {
    matchingTerms = matchingTerms.map((term) => "#" + term);
    return matchingTerms.join(", ");
  };

  const getCalendarResultElement = (result) => {
    const includeTime = true;
    const dateFormated = dateConverter(result.data.date, includeTime);
    return (
      <div className="result-info-column">
        <div className="row no-gutters">
          <img src={calendarIcon} alt="calendar" className="icon" />
          <h1>{result.data.title}</h1>
        </div>
        <p>{dateFormated}</p>
        <p>
          <strong>Invitees: </strong>
          {result.data.invitees}
        </p>
      </div>
    );
  };

  const getContactsResultElement = (result) => {
    const includeTime = false;
    const dateFormated = dateConverter(result.data.last_contact, includeTime);
    return (
      <div className="result-info-column">
        <div className="row no-gutters">
          <img src={contactIcon} alt="contact" className="icon" />
          <h1>{result.data.name}</h1>
        </div>
        <p>
          <strong>Company: </strong>
          {result.data.company}
        </p>
        <p>
          <strong>Emails: </strong>
          {result.data.emails.join(", ")}
        </p>
        <p>
          <strong>Phone: </strong>
          {result.data.phones.join(", ")}
        </p>
        <p>
          <strong>Last called: </strong>
          {dateFormated}
        </p>
      </div>
    );
  };

  const getDropboxResultElement = (result) => {
    const includeTime = false;
    const dateFormated = dateConverter(result.data.created, includeTime);
    return (
      <div className="result-info-column">
        <div className="row no-gutters">
          <img src={dropboxIcon} alt="dropbox" className="icon" />
          <h1>
            <a target="blank" href={result.data.path}>
              {result.data.title.replace(/"/g, "")}
            </a>
          </h1>
        </div>
        <p> {result.data.shared_with}</p>
        <p className="timestamp"> created {dateFormated}</p>
      </div>
    );
  };

  const getSlackResultElement = (result) => {
    const includeTime = true;
    const dateFormated = dateConverter(result.data.timestamp, includeTime);
    return (
      <div className="result-info-column">
        <div className="row no-gutters">
          <img src={slackIcon} alt="slack" className="icon" />
          <h1>{result.data.channel}</h1>
        </div>
        <p>
          <strong>From: </strong>
          {result.data.author}
        </p>
        <p className="result-message">{result.data.message}</p>
        <p className="timestamp">{dateFormated}</p>
      </div>
    );
  };

  const getTweetResultElement = (result) => {
    const includeTime = false;
    const dateFormated = dateConverter(result.data.timestamp, includeTime);
    return (
      <div className="result-info-column">
        <div className="row no-gutters">
          <img src={tweetIcon} alt="twitter" className="icon" />
          <h1>{result.data.user}</h1>
        </div>
        <p className="result-message">{result.data.message}</p>
        <p className="timestamp">posted {dateFormated}</p>
      </div>
    );
  };

  getElements(results, pushResultElement);
  getElements(pinnedResults, pushPinnedResultElement);

  return (
    <div className="results-container" data-test="results-container">
      {pinnedElements}
      {resultElements}
      {resultElements.length < 1 && pinnedElements.length < 1 && (
        <p className="no-results" data-test="no-results">
          No results to show...
        </p>
      )}
    </div>
  );
};

export default Results;
