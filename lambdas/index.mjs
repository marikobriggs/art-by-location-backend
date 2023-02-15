import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,GetCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client } from "@aws-sdk/client-s3";
import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { formatUrl } from "@aws-sdk/util-format-url"
import { HttpRequest } from "@aws-sdk/protocol-http"
import { Hash } from "@aws-sdk/hash-node"
import { parseUrl } from "@aws-sdk/url-parser"

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const s3Client = new S3Client({
  region: process.env.REGION,
  sha256: Hash.bind(null, "sha256")
});

export const bucketParams = {
  Bucket: process.env.BUCKET_NAME,
}

export const handler = async (event, context) => {
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
  } catch (error) {
    statusCode = 400;
    body = error.message;
  } 
  const urlString = await generatePresignedURL(getObjectUrlFromDynamo(body))
  body = urlString
  return {
    statusCode,
    body,
    headers
  };
}

// generates an s3 object uri 
// input: a country name in the format of "canada" 
// output: an object uri in the format of "s3://art-by-location-bucket/canada.jpeg"
export const getObjectUrlFromDynamo = (dynamoValue) => {
  return parseUrl(`https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${dynamoValue}`)
}

// generates a single presigned url 
// input: object uri in the format of "s3://art-by-location-bucket/canada.jpeg"
// output: a presigned url for that object uri 
export const generatePresignedURL = async (s3ObjectUrl) => {
  const presigner = new S3RequestPresigner({
    ...s3Client.config
  })
  const url = await presigner.presign(new HttpRequest(s3ObjectUrl)); 
  
  return formatUrl(url); 
}
