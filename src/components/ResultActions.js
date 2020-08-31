import React, { useState } from "react";
import { useDispatch } from "react-redux";
import pinIcon from "../icons/security-pin.svg";
import tagIcon from "../icons/tag.svg";
import deleteIcon from "../icons/delete.svg";
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
    <div className="result-actions">
      <img
        src={pinIcon}
        alt="pin"
        className="icon-small"
        onClick={() => handlePinClick()}
      />
      <img
        src={tagIcon}
        alt="tag"
        className="icon-small"
        onClick={() => handleTagClick()}
      />
      <img
        src={deleteIcon}
        alt="delete"
        className="icon-small"
        onClick={() => handleDeleteClick()}
      />
      {showTagModal && (
        <TagModal closeModal={closeModal} id={props.result.id} />
      )}
    </div>
  );
};

export default ResultActions;
