const nodemailer = require("nodemailer");

// test users
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER, // Mailtrap user
    pass: process.env.MAILTRAP_PASS, // Mailtrap pass
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

module.exports = { sendEmailToSubscriber };
