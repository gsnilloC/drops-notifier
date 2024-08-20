require("dotenv").config();

const sneaksAPI = require("sneaks-api");
const sneaks = new sneaksAPI();

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c790e3f16106ab", // Mailtrap user
    pass: "16ca80ae4784ed", // Mailtrap pass
  },
});

// Verify the connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Error verifying Mailtrap connection:", error);
  } else {
    console.log("Mailtrap is ready to take our messages");
  }
});

function sneaksApiFunctionWrapper(styleID) {
  return new Promise((resolve, reject) => {
    sneaks.getProductPrices(styleID, function (err, product) {
      if (err) {
        return reject(err); // Reject the promise if there's an error
      }

      // Finding the site with the lowest resell price
      const lowestResellSite = Object.keys(product.lowestResellPrice).reduce(
        (a, b) =>
          product.lowestResellPrice[a] > product.lowestResellPrice[b] ? a : b
      );

      // Constructing the sneaker object
      const sneaker = {
        name: product.shoeName,
        image: product.thumbnail,
        site: lowestResellSite,
        price: product.lowestResellPrice[lowestResellSite],
        url: product.resellLinks[lowestResellSite],
        styleID: product.styleID,
      };

      resolve(sneaker); // Resolve the promise with the sneaker object
    });
  });
}

function sendEmailToSubscriber(sneaker, subscriber) {
  const mailOptions = {
    from: '"Drops" <no-reply@example.com>', // Sender address
    to: subscriber.join(","), // List of subscribers
    subject: `Price Drop Alert: ${sneaker.name}`,
    html: `
      <h2>${sneaker.name}</h2>
      <p>Lowest Price: $${sneaker.price} at ${sneaker.site}</p>
      <img src="${sneaker.image}" alt="${sneaker.name}" style="width:200px;">
      <p>Buy now: <a href="${sneaker.url}">Link</a></p>
      <p>Style ID: ${sneaker.styleID}</p>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  // Fetch sneaker details and send the email
  sneaksApiFunctionWrapper("DZ2547-100")
    .then((sneaker) => {
      console.log("Sneaker details:", sneaker); // Log the resolved sneaker object

      // Send an email to the subscriber
      sendEmailToSubscriber(sneaker, ["cgichohi2018@gmail.com"]);
    })
    .catch((error) => {
      console.error("Error fetching sneaker data:", error); // Log any errors
    });
});
