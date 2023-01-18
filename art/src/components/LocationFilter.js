import React from "react";

import styles from "../index.css"

// import "./LocationFilter.css";

const LocationFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value)
  };

  return (
    <div>
      <div className="">
        <label>Filter by location</label>
        <select className="w-1/2 p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-slate-600" onChange={dropdownChangeHandler}>
          <option value="Paris">Paris</option>
          <option value="Tokyo">Tokyo</option>
          <option value="New York">New York</option>
        </select>
      </div>
    </div>
  );
};

export default LocationFilter;
