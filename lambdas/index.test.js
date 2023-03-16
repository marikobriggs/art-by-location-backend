const { generatePresignedURL } = require("./index");

process.env.REACT_APP_ENV = "test";
// const { index } = require("./index");

// RESPONSE FROM SUCCESSFUL CALL (canada)
// {
//   '$metadata': {
//     httpStatusCode: 200,
//     requestId: '20TD3MVMUM4G2TES0BTHJ2778RVV4KQNSO5AEMVJF66Q9ASUAAJG',
//     extendedRequestId: undefined,
//     cfId: undefined,
//     attempts: 1,
//     totalRetryDelay: 0
//   },
//   ConsumedCapacity: undefined,
//   Item: { CountryName: 'canada', ObjectName: 'canada.jpeg' }
// }

// RESPONSE FROM UNSUCESSFUL CALL (Argentina)
// {
//   '$metadata': {
//     httpStatusCode: 200,
//     requestId: 'R1PEDVHNQPGQF3DIA9EOCV2V4JVV4KQNSO5AEMVJF66Q9ASUAAJG',
//     extendedRequestId: undefined,
//     cfId: undefined,
//     attempts: 1,
//     totalRetryDelay: 0
//   },
//   ConsumedCapacity: undefined,
//   Item: undefined
// }

// jest.mock('./index', () => {
//   generatePresignedURL: () => 'this is the url'
// })

// TODO: find sol to module not found error 

jest.mock('./index', () => {
  generatePresignedURL: jest.fn(() => {
    return Promise.resolve({body: 'this is the url' })
  })
})

it('tests if mock works', async () => {
  result = generatePresignedURL() 
  expect(result).toEqual("this is the url")
})

/////////////////////////////////////////

const mockDynamoGet = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({body: "get body"}); 
    }
  }
})

jest.mock('@aws-sdk/lib-dynamodb', () => {
  return {
    DynamoDB: jest.fn(() => ({
      DocumentClient: jest.fn(() => {
        send: mockDynamoGet 
      })
    })) 
  }
})

it("test", async () => {
  const expectedResult = {"Item": { "ObjectName":"canada.jpeg"}}
  expect(await index.mockDynamoGet()).toEqual(expectedResult) 
})

jest.mock('@aws-sdk/client-s3', () => {
  return {

  }
})

jest.mock('@aws-sdk/s3-request-presigner', () => {
  return {
    S3RequestPresigner: jest.fn(() => {
      presign: Promise.resolve({body: "this is url"})
    }) 
  }
})

it("tests presigned url", async () => {
  const expectedResult = {"body":"this is url"}
  expect(await index.presign()).toEqual(expectedResult) 
})



// mock generatePresignedURL method 
// it("returns correct result", () => {
//   const generatePresignedMock = jest.spyOn(index, "generatePresignedURL"); 
//   const result = generatePresignedMock("s3://art-by-location-bucket/canada.jpeg"); 
// })

// beforeEach(() => {
//   send = jest.fn(() => {
//     Promise.resolve({
//       getCommand: {
//         httpStatusCode: 200,
//         Item: { CountryName: "canada", ObjectName: "canada.jpeg" },
//       },
//     });
//   });
// });



// it("successfully hits dynamo by calling canada", async () => {
//   const result = await index.handler("canada");
//   console.log(result);

//   expect(result.httpStatusCode).toEqual(200);
//   expect(result.Item.ObjectName).toEqual("canada.jpeg");
// });
