process.env.REACT_APP_ENV = "test";
const { index } = require("./index");

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

const mockDynamoGet = jest.fn().mockImplementation(() => {
  return {
    promise() {
      return Promise.resolve({}); 
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

// jest.mock('aws-sdk/client-s3', () => {
//   return {

//   }
// })

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