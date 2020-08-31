import React, { useState } from "react";
import { useDispatch } from "react-redux";
import pinIcon from "../assets/security-pin.svg";
import tagIcon from "../assets/tag.svg";
import deleteIcon from "../assets/delete.svg";
import TagModal from "./TagModal";
import { pinResult, unpinResult, deleteResult } from "../actions/index";

const ResultActions = (props) => {
  const [showTagModal, setshowTagModal] = useState(false);
  const dispatch = useDispatch();

  const handlePinClick = () => {
    if (props.result.pinned) {
      dispatch(unpinResult(props.result));
    } else {
      dispatch(pinResult(props.result));
    }
  };

  const handleTagClick = () => {
    setshowTagModal(true);
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm("Delete this search result?");
    if (confirmed) {
      dispatch(deleteResult(props.result.id));
    }
  };

  const closeModal = () => {
    setshowTagModal(false);
  };

  return (
    <div className="result-actions" data-test="result-actions">
      <img
        src={pinIcon}
        alt="pin"
        className="icon-small"
        onClick={() => handlePinClick()}
        data-test="pin"
      />
      <img
        src={tagIcon}
        alt="tag"
        className="icon-small"
        onClick={() => handleTagClick()}
        data-test="tag"
      />
      <img
        src={deleteIcon}
        alt="delete"
        className="icon-small"
        onClick={() => handleDeleteClick()}
        data-test="delete"
      />
      {showTagModal && (
        <TagModal closeModal={closeModal} id={props.result.id} />
      )}
    </div>
  );
};

export default ResultActions;
