const requestArtURL = async (filteredLocation) => {
  // const throwRequestArtURLError = async () => {
  //   throw new Error("Error requesting art");
  // };
  // let url = "";
  console.log(filteredLocation);

  const myRequest = new Request(
    `https://glusk0c208.execute-api.us-west-1.amazonaws.com/items/${filteredLocation}`
  );

  const response = await fetch(myRequest);
  const responseBody = await response.json();
  return await responseBody.URL;

  // try {
  //   const response = await fetch(myRequest);
  //   const responseBody = await response.json();
  // } catch (err) {
  //   console.error(err);
  // } finally {
  //   console.log("Errors follow?")
  //   return await responseBody.URL
  // }

  // return await responseBody.URL;

  // return fetch(myRequest)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error: ${response.status}`);
  //     }
  //     // console.log("RESPONSE.JSON ====== " + response.json());
  //     // url = response;
  //     return response.json();
  //   })
  //   .then((response) => {
  //     // url = response.URL;
  //     // console.log(url)
  //     return response.URL;
  //   })
  //   .catch((error) => {
  //     console.error("Fetch error: ", error);
  //   });
};

export default requestArtURL;
