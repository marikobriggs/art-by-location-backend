module.exports = {
  tables: [
    {
      TableName: process.env.REACT_APP_DYNAMODB_NAME,
      KeySchema: [{AttributeName: process.env.REACT_APP_DYNAMODB_HASH_KEY, KeyType: 'HASH'}],
      AttributeDefinitions: [{AttributeName: process.env.REACT_APP_DYNAMODB_HASH_KEY, AttributeType: 'S'}],
      ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
    },
    // etc
  ],
};