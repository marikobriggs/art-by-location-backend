// Documenting old version of art-api lambda code as it was not developed in an environment with git. 

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const s3Client = new S3Client({});

const tableName = "ArtByLocationTable";


export const bucketParams = {
  Bucket: process.env.BUCKET_NAME,
}

const s3FileTest = "s3://art-by-location-bucket/canada.jpeg";


export const handler = async (event, context) => {
  // generatePresigned(keys[0])

  let body;
  // let url; 
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":"*",
    // "Access-Control-Allow-Headers": "X-Requested-With"
  };

  // try { // GET /items/{CountryName}
  //   body = await dynamo.send(
  //     new GetCommand({
  //       TableName: tableName,
  //       Key: {
  //         CountryName: event.pathParameters.CountryName,
  //       },
  //     })
  //   );
  //   console.log(event.pathParameters.CountryName)
  //   // body = body.Item.URL;
  //   body = body.Item; 
  // } catch (error) {
  //   statusCode = 400;
  //   body = error.message;
  // } finally {
  //   body = JSON.stringify(body);
  // }
  
  try {
    console.log("###########################", event.pathParameters.CountryName)
    console.log(keyToObjectName(event.pathParameters.CountryName))
    statusCode = 200;
    body = await generatePresigned(keyToObjectName(event.pathParameters.CountryName))
    
  } catch (err) {
    statusCode = 400; 
    body = err.message; 
  // } finally {
  //   body = body
  }

  return {
    statusCode,
    // body,
    headers,
    body
  };
}

// HELPER METHOD LAND!!!!!!!! 
  
  // generates a single presigned url 
// input: key in the format of "country_name.jpeg" 
export const generatePresigned = async (key) => {
  let signedUrl = "";
  try {
    const command = new GetObjectCommand({Bucket: bucketParams.Bucket, Key: key});
    // Create the presigned URL.
    signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 300, 
    });
    console.log(
      `\nGetting "${key}" using signedUrl in v3`
    );
    console.log(signedUrl);
  } catch (err) {
    console.error("Error creating presigned URL", err);
  }
  return signedUrl; 
};

// input: objectName, in the format of "country-name.jpeg"
// output: key, in the format of "Country Name" 
export const objectNameToKey = (objectName) => {
  let finalKey = "" 
  // remove file extension and split into array to account for countries w more than one word in name 
  let keyArray = objectName.slice(0, objectName.indexOf('.')).split('-'); 
  
  keyArray.map(key => {
    finalKey += (key.charAt(0).toUpperCase() + key.slice(1)) + " "// capitalize 
  })
  return finalKey.trim(); 
}

// assumes all files are jpeg 
export const keyToObjectName = (key) => {
  let objectName = key.replace(" ", "-") + ".jpeg"
  return objectName.toLowerCase(); 
}
