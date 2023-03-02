import requestArtURL from "./requestArtURL";

beforeEach(() => {
  // sets up our mocked fetch response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      // resolves the first promise returned by fetch
      json: () => Promise.resolve({ body: "canadaurl", status: 200 }),
    })
  );

  // clears our mock meta info to ensure .mock data is accurate in separate tests
  fetch.mockClear();
});

describe("assuming api fetch promise is resolved", () => {
  // input: canada, a valid location
  // output: canada's url
  it("returns a canada url, as location was valid (canada)", async () => {
    const result = await requestArtURL("Canada");

    expect(result.body).toEqual("canadaurl");
    expect(result.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // input: florida, an invalid location
  // output: canada's url
  it("returns an error, as location was invalid (florida)", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ body: "errormessage", status: 400 }),
      })
    );
    const result = await requestArtURL("Florida");

    expect(result.body).toEqual("errormessage");
    expect(result.status).toEqual(400) 
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe("assuming api fetch promise is rejected", () => {
  // input: canada, a valid location
  // output: error, due to api failure
  it("returns an error due to api failure with valid location (canada)", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("promise rejected"))
    );

    const result = await requestArtURL("Canada");
    expect(result).toEqual(new Error("promise rejected"));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // input: florida, an invalid location
  // output: error, due to api failure
  it("returns an error due to api failure with invalid location (florida)", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("promise rejected"))
    );

    const result = await requestArtURL("Florida");
    expect(result).toEqual(new Error("promise rejected"));
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
