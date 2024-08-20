const { sneaksApiFunctionWrapper } = require("./sneakers.js");
const { sendEmailToSubscriber } = require("./emailer.js");

exports.handler = async (event) => {
  try {
    // Extract parameters from the event object
    const styleID = event.styleID || "DZ2547-100";
    const email = event.email || "default@example.com";

    console.log("Received event:", event);

    // Fetch sneaker details
    const sneaker = await sneaksApiFunctionWrapper(styleID);

    // Send an email to the subscriber
    await sendEmailToSubscriber(sneaker, [email]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    // Log only specific errors
    if (error.code === "ERR_NON_2XX_3XX_RESPONSE") {
      console.error("Network error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error occurred" }),
    };
  }
};
