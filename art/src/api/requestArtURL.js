const requestArtURL = async (filteredLocation) => {

  filteredLocation = filteredLocation.toLowerCase().replace(" ", "-"); 

  const requestURL =  `https://zs1s7cbrt3.execute-api.us-west-1.amazonaws.com/main/items/${filteredLocation}`

  const myRequest = new Request(
    requestURL
  );
  
  const response = await fetch(myRequest);
  const responseURL = await response.text(); 
  return responseURL; 

  // try {
  //   const response = await fetch(myRequest);
  //   const responseBody = await response.json();
  //   console.log("response body " + await responseBody)

  //   if (response.ok) {
  //     return await responseBody;
  //   } else {
  //     throw new Error("Bad network response");
  //   }
  // } catch (error) {
  //   return error;
  // }

};

export default requestArtURL;

// const response = await fetch(myRequest);
// const responseBody = await response.json();
// return await responseBody.URL;
