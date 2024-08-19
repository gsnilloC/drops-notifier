require("dotenv").config();

const sneaksAPI = require("sneaks-api");
const sneaks = new sneaksAPI();

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));

const messagingResponse = require("twilio").twiml.MessagingResponse;

app.post("/sms", async (req, res) => {
  const twiml = new messagingResponse();
  const SMS = twiml.message();
  const recievedSMS = req.body.Body.toLowerCase().trim();
  e;
  const firstWord = recievedSMS.split(" ")[0];

  if (firstWord === "track") {
    const styleID = recievedSMS.split(" ")[1];
    if (styleID) {
      const sneaker = await sneaksAPIWrapper(styleID);
      if (!sneaker) {
        SMS.body("Sneaker could not be found");
      } else {
        const sub = {
          number: req.body.From,
          styleID: sneaker.styleID,
          lastResellPrice: sneaker.price,
        };
        Subscribers.push(sub);
        SMS.media(sneaker.image);
        SMS.body(
          `Current lowest price for the ${sneaker.name} is $${String(
            sneaker.price
          )} at ${sneaker.site}: ${
            sneaker.url
          }\nYou will be notified when the price drops. Reply STOP to opt-out of alerts.`
        );
      }
    }
  } else {
    SMS.body(
      'To keep track of a sneaker, text "track" followed by the style ID of the sneaker you want to track.'
    );
  }

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

function sneaksAPIWrapper(styleID) {
  return new Promise((resolve, reject) => {
    sneaks.getSneaker(
      styleID,
      (err, product) => {
        const lowestResellSite = Object.keys(product.lowestResellSite)[0];
        const sneaker = {
          name: product.name,
          price: product.lowestResellPrice[lowestResellSite],
          image: product.thumbnail,
          site: lowestResellSite,
          styleID: product.styleID,
          url: product.resellLinks[lowestResellSite],
        };
        resolve(sneaker);
      },
      (errorResponse) => {
        reject(errorResponse);
      }
    );
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
