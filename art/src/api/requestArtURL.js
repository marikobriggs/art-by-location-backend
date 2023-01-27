const requestArtURL = async (filteredLocation) => {
  console.log(filteredLocation);

  const myRequest = new Request(
    `https://glusk0c208.execute-api.us-west-1.amazonaws.com/items/${filteredLocation}`
  );

  try {
    const response = await fetch(myRequest);
    const responseBody = await response.json();

    if (response.ok) {
      return await responseBody.URL;
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
