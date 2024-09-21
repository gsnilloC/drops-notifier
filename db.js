const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * Function to store sneaker and user data into DynamoDB
 * @param {Object} sneaker - The sneaker object containing price and metadata
 * @param {Object} event - The event containing email, styleID, priceTarget, and notify
 */
async function storeSneakerData(sneaker, event) {
  const params = {
    TableName: "SneakerNotifications",
    Item: {
      email: event.email,
      styleID: sneaker.styleID,
      price: sneaker.price,
      priceTarget: event.priceTarget || 100,
      notify: event.notify !== undefined ? event.notify : true,
      site: sneaker.site,
      url: sneaker.url,
      name: sneaker.name,
      timestamp: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    console.log("Data stored successfully in DynamoDB");
  } catch (error) {
    console.error("Error storing data in DynamoDB:", error);
    throw new Error("DynamoDB storage failed: " + error.message);
  }
}

module.exports = { storeSneakerData };
