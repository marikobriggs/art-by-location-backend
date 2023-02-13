const requestArtURL = async (filteredLocation) => {

  filteredLocation = filteredLocation.toLowerCase().replace(" ", "-"); 

  console.log("FILITERED LOCATION ", filteredLocation)
  // const myHeaders = new Headers(); 
  // myHeaders.append("Access-Control-Allow-Origin", "*");

  const requestParams = {
    // headers: myHeaders,
    // mode: 'no-cors'
  };


  const requestURL =  `https://zs1s7cbrt3.execute-api.us-west-1.amazonaws.com/main/items/${filteredLocation}`
  // console.log("request url is ", requestURL) 
  const myRequest = new Request(
    requestURL,
    requestParams
  );
  
  const response = await fetch(myRequest);
  // console.log("response body is ", response.body) 
  const responseURL = await response.text(); 
  // console.log("response.text() is", await response.text())
  // console.log("response url from backend is ", response.url)
  // const responseBody = await response.json();
  // const responseBody = await JSON.parse(response); 

  // const responseBody = await response.json(); 
  // console.log("response body backend is", responseBody)
  return responseURL; 
  // return responseBody;

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
