import React, { useState } from "react";
import ImageDisplay from "./ImageDisplay";
import LocationFilter from "./LocationFilter";
import requestArtURL from "../api/requestArtURL";

const Menu = (props) => {
  const [filteredLocation, setFilteredLocation] = useState(props.options[0]);
  const [artURL, setArtURL] = useState("");

  // TODO: don't use a function for props
  const filterChangeHandler = (selectedLocation) => {
    setFilteredLocation(selectedLocation);
  };

  const buttonClickHandler = async (event) => {
    console.log("start" + "-".repeat(40));
    (async () => {
      let response = await requestArtURL(filteredLocation);
      let url = response.body; 
      console.log("this is the url from the front end ", url) 
      // handling error return from api call function.
      // if (url instanceof Error) console.log("Error occured in requesting URL.");
      setArtURL(url) 
    })();
  };

  return (
    <div className="">
      <LocationFilter
        options={props.options}
        selected={filteredLocation}
        onChangeFilter={filterChangeHandler}
      />
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          buttonClickHandler();
        }}
      >
        Display random art from {filteredLocation}
      </button>
      <ImageDisplay className="p-2" url={artURL} />
    </div>
  );
};

export default Menu;
