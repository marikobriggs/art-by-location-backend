import React from "react";

import "./LocationFilter.css";

const LocationFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value)
  };

  return (
    <div className="location-filter">
      <div className="location-filter__control">
        <label>Filter by location</label>
        <select onChange={dropdownChangeHandler}>
          <option value="Paris">Paris</option>
          <option value="Tokyo">Tokyo</option>
          <option value="New York">New York</option>
        </select>
      </div>
    </div>
  );
};

export default LocationFilter;
