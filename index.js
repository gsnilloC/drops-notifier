const { sneaksApiFunctionWrapper } = require("./sneakers.js");
const { sendEmailToSubscriber } = require("./emailer.js");
const { storeSneakerData } = require("./db.js");

exports.handler = async (event) => {
  try {
    const styleID = event.styleID || "669630-604";
    const email = event.email || "default@example.com";
    const priceTarget = event.priceTarget || 100;
    const notify = event.notify !== undefined ? event.notify : true;

    const sneaker = await sneaksApiFunctionWrapper(styleID);

    // Check if the current price is lower than the target price and notify the user
    // if (notify && sneaker.price <= priceTarget) {
    //   await sendEmailToSubscriber(sneaker, [email]);
    // }

    // Store the sneaker data in DynamoDB
    await storeSneakerData(sneaker, { email, priceTarget, notify });

    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error occurred", error: error.message }),
    };
  }
};
