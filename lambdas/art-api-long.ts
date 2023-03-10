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
import { S3RequestPresigner, getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

const tableName = "ArtByLocationTable";


export const bucketParams = {
  Bucket: process.env.BUCKET_NAME,
}



export const handler = async (event, context) => {
  let body;

  let statusCode = 200;
  // const headers = {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin":"*",
  //   // "Access-Control-Allow-Headers": "X-Requested-With"
  // };

  try { // GET /items/{CountryName}
    body = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          CountryName: event.pathParameters.CountryName,
        },
      })
    );
  //   console.log(event.pathParameters.CountryName)
    body = body.Item.URL;
  //   body = body.Item; 
  } catch (error) {
    statusCode = 400;
    body = error.message;
  } 
  // console.log(body)
  const urlString = await generatePresignedURL(getObjectUrlFromDynamo(body))
  console.log(urlString)
  // generatePresignedURL takes in an s3 object url. 
  // getObjectUrlFromDynamo takes in a country name in the format of "Canada" 
  console.log(typeof(urlString))
  // return urlString;

  // return body; 
  
  // try {
  //   console.log("###########################", event.pathParameters.CountryName)
  //   console.log(keyToObjectName(event.pathParameters.CountryName))
  //   statusCode = 200;
  //   // body = await generatePresigned(keyToObjectName(event.pathParameters.CountryName))
    
  // } catch (err) {
  //   statusCode = 400; 
  //   body = err.message; 
  // // } finally {
  // //   body = body
  // }

  return {
    statusCode,
    // body,
    headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
    urlString
  };
}

// HELPER METHOD LAND!!!!!!!! 

export const getObjectUrlFromDynamo = (dynamoValue) => {
  return parseUrl(`https://art-by-location-bucket.s3.${process.env.REGION}.amazonaws.com/${dynamoValue}`)
}

// export const getS3PathFromDynamo = async (event, context) => {
//   console.log("in dynamo method")
//   var body;

//   let statusCode = 200;
//   const headers = {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin":"*",
//     // "Access-Control-Allow-Headers": "X-Requested-With"
//   };

//   const countryName = event.pathParameters.CountryName; 

//   const params = {
//     TableName: tableName,
//     Key: {
//       CountryName: countryName,
//     },
//   }
  
//   console.log(params)
    
  
//   try { // GET /items/{CountryName}
//     console.log("in dynamo try")
//     body = await dynamo.send(
//       new GetCommand(params)
//     )
//     console.log(await body.Item.URL);
//     // console.log("Event path in dynamo method: ")
//     // console.log(event.pathParameters.CountryName)

//     // body = body.Item.URL;
//     // body = await body.Item; 
//   } catch (error) {
//     statusCode = 400;
//     body = error.message;
//   } finally {
//     body = JSON.stringify(await body);
//     console.log(body)
//   }
  
//   // console.log(body)
//   // try {
//   //   console.log("###########################", event.pathParameters.CountryName)
//   //   console.log(keyToObjectName(event.pathParameters.CountryName))
//   //   statusCode = 200;
//   //   // body = await generatePresigned(keyToObjectName(event.pathParameters.CountryName))
    
//   // } catch (err) {
//   //   statusCode = 400; 
//   //   body = err.message; 
//   // // } finally {
//   // //   body = body
//   // }

//   // return {
//   //   statusCode,
//   //   // body,
//   //   headers,
//   //   body
//   // };

// }

// generates a single presigned url 
// input: object uri in the format of "s3://art-by-location-bucket/canada.jpeg"
export const generatePresignedURL = async (s3ObjectUrl) => {
  const presigner = new S3RequestPresigner({
    ...s3Client.config
  })
  
  const url = await presigner.presign(new HttpRequest(s3ObjectUrl)); 
  console.log("Presigned url: ", formatUrl(url));
  return formatUrl(url); 
}
  
  // generates a single presigned url 
// input: key in the format of "country_name.jpeg" 
// export const generatePresigned = async (key) => {
//   let signedUrl = "";
//   try {
//     const command = new GetObjectCommand({Bucket: bucketParams.Bucket, Key: key});
//     // Create the presigned URL.
//     signedUrl = await getSignedUrl(s3Client, command, {
//       expiresIn: 300, 
//     });
//     console.log(
//       `\nGetting "${key}" using signedUrl in v3`
//     );
//     console.log(signedUrl);
//   } catch (err) {
//     console.error("Error creating presigned URL", err);
//   }
//   return signedUrl; 
// };

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
