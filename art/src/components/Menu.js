import React, { useState } from "react";

import LocationFilter from "./LocationFilter";

const Menu = () => {
  const [filteredLocation, setFilteredLocation] = useState('Paris')

  // TODO: don't use a function for props 
  const filterChangeHandler = (selectedLocation) => {
    setFilteredLocation(selectedLocation) 
  }

  const buttonClickHandler = (event) => {
    console.log(filteredLocation) 
  }

  return (
    <div>
      <LocationFilter selected={filteredLocation} onChangeFilter={filterChangeHandler}/>
      <button onClick={buttonClickHandler}>Display random art from {filteredLocation}</button>
    </div>
  )
}

export default Menu 