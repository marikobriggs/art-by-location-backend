const requestArtURL = (filteredLocation) => {
  let randomObjectID = 0;
  let url = "sufdajlsdf";

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
    }) // TODO: add error handling for second fetch
    .then((response) => {
      return response.json();
    })
    
    .then((data) => {
      console.log(data.primaryImageSmall);
      // setArtURL(data.primaryImageSmall);
      console.log("before set" + url) 
      url = data.primaryImageSmall;
      console.log("after set" + url);
      return url;
    });
  // console.log("ASKJDFKAJSDFKLJASDFJKSFJ " + url);
  // return url;
};

export default requestArtURL;
