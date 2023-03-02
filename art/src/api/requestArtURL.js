const requestArtURL = async (filteredLocation) => {

  filteredLocation = filteredLocation.toLowerCase().replace(" ", "-"); 

  const requestURL =  `https://${process.env.REACT_APP_APIGW_ID}.execute-api.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/${process.env.REACT_APP_APIGW_STAGE}/items/${filteredLocation}`
  // console.log(requestURL)

  const myRequest = new Request(
    requestURL
  );
  
  try {
    const response = await fetch(myRequest);
    const responseJson = await response.json();
    console.log(responseJson)
    return responseJson; 
  } catch (error) {
    return error; 
  }

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