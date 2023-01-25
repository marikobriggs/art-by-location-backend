import React, { useState } from "react";
import ImageDisplay from "./ImageDisplay";
import LocationFilter from "./LocationFilter";

// TODO: decompose Button
const Menu = (props) => {
  const [filteredLocation, setFilteredLocation] = useState(props.options[0]);
  const [artURL, setArtURL] = useState("");


  // TODO: don't use a function for props
  const filterChangeHandler = (selectedLocation) => {
    setFilteredLocation(selectedLocation);
  };

  const buttonClickHandler = (event) => {
    let randomObjectID = 0;
    console.log(filteredLocation);
    console.log("artURL = " + artURL);

    const myRequest = new Request(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&geoLocation=${filteredLocation}&q=""`
    );
    fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        // response is an array of objectIDs, each of which correspond to a piece of art
        // here we choose a random value from that array and return another fetch call which gets more info on that object
        let random = Math.floor(Math.random() * response.objectIDs.length);
        console.log(random, response.objectIDs[random]);
        randomObjectID = response.objectIDs[random];

        return fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`
        );
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArtURL(data.primaryImageSmall);
      });
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
