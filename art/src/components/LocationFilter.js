import React from "react";

const LocationFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div>
      <div className="p-2">
        <div className="p-2 flex items-center justify-center">
          <label className="text-gray-700">Choose a country</label>
        </div>
        <select
          className="w-1/2 p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-slate-600"
          onChange={dropdownChangeHandler}
        >
          {props.options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationFilter;
