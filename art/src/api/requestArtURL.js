const requestArtURL = async (filteredLocation) => {
  console.log(filteredLocation);

  const myHeaders = new Headers(); 
  myHeaders.append("Access-Control-Allow-Origin", "*");

  const requestParams = {
    headers: myHeaders,
    mode: 'no-cors'
  };



  const myRequest = new Request(
    `https://glusk0c208.execute-api.us-west-1.amazonaws.com/items/${filteredLocation.toLowerCase()}`,
    requestParams
  );

  try {
    const response = await fetch(myRequest);
    console.log("response = ", response) 
    console.log("response stringify = ", JSON.stringify(response))
    const responseBody = await response.json();
    console.log("response body " + await responseBody)

    if (response.ok) {
      return await responseBody;
    } else {
      throw new Error("Bad network response");
    }
  } catch (error) {
    return error;
  }
};

export default requestArtURL;

// const response = await fetch(myRequest);
// const responseBody = await response.json();
// return await responseBody.URL;
