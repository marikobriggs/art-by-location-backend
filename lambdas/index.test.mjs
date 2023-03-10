import { index } from "./index";

process.env.REACT_APP_ENV="test"; 

const { mockClient } = require("aws-sdk-client-mock");
const { S3Client } = require("@aws-sdk/client-s3")
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient,GetCommand } = require("@aws-sdk/lib-dynamodb");
// error situations:
// - some flavor of 400 error (sometimes retries apply)
// - some flavor of 500 error 
// -
// const myMock = jest.fn(() =>

// )

const s3ClientMock = mockClient(S3Client)
// ? 
// const dynamoClient = new DynamoDBClient({});
// const dynamoClientMock = mockClient(DynamoDBDocumentClient.from(dynamoClient))

// jest.mock('aws-sdk', () => {
//   return {
//     DynamoDB: { // just an object, not a function
//       DocumentClient: jest.fn(() => ({
//         put: mockDynamoDbPut
//       }))
//     }
//   }});



beforeEach(() => {
  s3ClientMock.reset();
  // dynamoClientMock.reset(); 
})

// TypeError: Cannot read properties of undefined (reading 'ObjectName')
// returned when a non-exist country is entered 
it("is a type error", () => {
  
})

it("is a big test", () => {
  console.log("234234234ASKDJFKASJDKFKASDJFKASJDFKAJS")
})

describe("400 errors", () => {
  it("is a test", () => {
    console.log("WOJASDFJKSAJDFKLSJFKDJSAJFDSKF")
    expect(true).toBeTruthy(); 
  })
})

