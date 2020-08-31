import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTags } from "../actions/index";

const TagModal = (props) => {
  const dispatch = useDispatch();
  const [tags, seTags] = useState("");

  const handleInputChange = (event) => {
    seTags(event.target.value);
  };

  const handleAddTagsClick = () => {
    let tagsList = tags.split(",");
    tagsList = tagsList.map((tag) => tag.toLowerCase().trim());
    tagsList = tagsList.filter((tag) => tag !== "");
    tagsList = [...new Set(tagsList)];
    dispatch(addTags(props.id, tagsList));
    props.closeModal();
  };

  const onKeyDown = ({ key }) => {
    if (key === "Enter") {
      handleAddTagsClick();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  return (
    <div className="tag-modal" data-test="tag-modal">
      <div className="tag-popup">
        <h1>Add Tags to Result</h1>
        <p>Separate your tags with commas</p>
        <input
          onChange={handleInputChange}
          className="input"
          id="modal-input"
          placeholder="enter tags..."
          data-test="tag-input"
        ></input>
        <button
          onClick={handleAddTagsClick}
          className="button modal-button"
          data-test="tag-button"
        >
          Add Tags
        </button>
        <button
          onClick={props.closeModal}
          className="button modal-button"
          data-test="tag-close-button"
        >
          close
        </button>
      </div>
    </div>
  );
};

export default TagModal;
