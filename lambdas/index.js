const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand } = require("@aws-sdk/lib-dynamodb");
// const { S3Client } = require("@aws-sdk/client-s3");
// const { S3RequestPresigner } = require("@aws-sdk/s3-request-presigner");
// const { formatUrl } = require("@aws-sdk/util-format-url");
// const { HttpRequest } = require("@aws-sdk/protocol-http");
// const { Hash } = require("@aws-sdk/hash-node");
// const { parseUrl } = require("@aws-sdk/url-parser");

// const client = new DynamoDBClient({});
// const dynamo = DynamoDBDocumentClient.from(client);
// const s3Client = new S3Client({
//   region: process.env.REGION,
//   sha256: Hash.bind(null, "sha256")
// });

module.exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  }

  try { // GET /items/{CountryName}
  console.log(event.pathParameters.CountryName)
    body = await dynamo.send(
      new GetCommand({
        TableName: process.env.TABLE_NAME,
        Key: {
          CountryName: event.pathParameters.CountryName,
        },
      })
    );

    body = body.Item.ObjectName;
    const urlString = await generatePresignedURL(getObjectUrlFromDynamo(body))
    body = urlString
    
  } catch (error) { // TODO: improve. no retry logic atm 
    if (error.statusCode) 
      statusCode = error.statusCode; 
    else  // meant to catch TypeError, which does not come with an included status code. TODO: see if any other errors are like this? 
      statusCode = 400; 

    body = error.name + ": " + error.message;
  } 

  return JSON.stringify({
    statusCode,
    body,
    headers
  });
}

// generates an s3 object uri 
// input: a country name in the format of "canada" 
// output: an object uri in the format of "s3://art-by-location-bucket/canada.jpeg"
module.exports.getObjectUrlFromDynamo = (dynamoValue) => {
  return parseUrl(`https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${dynamoValue}`)
}

// generates a single presigned url 
// input: object uri in the format of "s3://art-by-location-bucket/canada.jpeg"
// output: a presigned url for that object uri 
module.exports.generatePresignedURL = async (s3ObjectUrl) => {
  const presigner = new S3RequestPresigner({
    ...s3Client.config
  })
  const url = await presigner.presign(new HttpRequest(s3ObjectUrl)); 
  
  return formatUrl(url); 
} 

// export default handler; 
