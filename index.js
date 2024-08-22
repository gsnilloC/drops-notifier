const { sneaksApiFunctionWrapper } = require("./sneakers.js");
const { sendEmailToSubscriber } = require("./emailer.js");

exports.handler = async (event) => {
  try {
    // Extract parameters from the event object
    const styleID = event.styleID || "DZ2547-100"; // Default to a sample styleID if not provided
    const email = event.email || ["default@example.com"]; // Default to a sample email if not provided

    // Fetch sneaker details
    const sneaker = await sneaksApiFunctionWrapper(styleID);

    // Send an email to the subscriber
    await sendEmailToSubscriber(sneaker, [email]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error occurred" }),
    };
  }
};
