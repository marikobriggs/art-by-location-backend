import React, { useState } from "react";
import LocationFilter from "./LocationFilter";

const Menu = () => {
  const [filteredLocation, setFilteredLocation] = useState("Paris");

  // TODO: don't use a function for props
  const filterChangeHandler = (selectedLocation) => {
    setFilteredLocation(selectedLocation);
  };

  // 'https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]'
  const buttonClickHandler = (event) => {
    let randomObjectID = 0;
    console.log(filteredLocation);

    const myRequest = new Request(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&geoLocation=" +
        filteredLocation +
        '&q=""'
    );
    fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        let random = Math.floor(Math.random() * response.objectIDs.length);
        console.log(random, response.objectIDs[random]);
        randomObjectID = response.objectIDs[random];

        return fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectID}`
        );
      }) 
      .then((response) => {
        return response.json()
      }) 
      .then((data) => {
        // console.log(data) 
        console.log(data.primaryImageSmall) 
      }) 
      // })
      // .then(
      //   ((response) => response.json()).catch((err) => {
      //     console.error("Request failed", err);
      //   })
      // );

    // fetch(
    //   "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&hasImages=true&geoLocation=" +
    //     filteredLocation +
    //     '&q=""'
    // )
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  };

  return (
    <div>
      <LocationFilter
        selected={filteredLocation}
        onChangeFilter={filterChangeHandler}
      />
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={buttonClickHandler}
      >
        Display random art from {filteredLocation}
      </button>
    </div>
  );
};

export default Menu;
