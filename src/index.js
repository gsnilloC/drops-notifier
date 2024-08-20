require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

const { sneaksApiFunctionWrapper } = require("./sneakers.js");
const { sendEmailToSubscriber } = require("./emailer.js");

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  // Fetch sneaker details and send the email
  sneaksApiFunctionWrapper("DZ2547-100")
    .then((sneaker) => {
      console.log("Sneaker details:", sneaker); // Log the resolved sneaker object

      // Send an email to the subscriber
      //sendEmailToSubscriber(sneaker, ["cgichohi2018@gmail.com"]);
    })
    .catch((error) => {
      console.error("Error fetching sneaker data:", error); // Log any errors
    });
});
