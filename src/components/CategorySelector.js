import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../actions/index";
import * as constants from "../constants/constants";

const CatergorySelector = () => {
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const buttonActive = "category-button category-button-active";
  const buttonInactive = "category-button";

  const dispatch = useDispatch();
  const handleClick = (category) => dispatch(setSelectedCategory(category));

  const categories = [
    constants.ALL,
    constants.CALENDAR,
    constants.CONTACTS,
    constants.DROPBOX,
    constants.SLACK,
    constants.TWEET,
  ];

  return (
    <div
      className="row no-gutters category-selector"
      data-test="category-selector"
    >
      {categories.map((category) => {
        return (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={
              selectedCategory === category ? buttonActive : buttonInactive
            }
            data-test="category-button"
            data-test-category={category.toLowerCase()}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CatergorySelector;
