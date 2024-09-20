const nodemailer = require("nodemailer");

// test users
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

function sendEmailToSubscriber(sneaker, subscriber) {
  const mailOptions = {
    from: '"Drops" <no-reply@example.com>',
    to: subscriber.join(","),
    subject: `Price Drop Alert: ${sneaker.name}`,
    html: `
      <h2>${sneaker.name}</h2>
      <p>Lowest Price: $${sneaker.price} at ${sneaker.site}</p>
      <img src="${sneaker.image}" alt="${sneaker.name}" style="width:200px;">
      <p>Buy now: <a href="${sneaker.url}">Link</a></p>
      <p>Style ID: ${sneaker.styleID}</p>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        reject(error);
      } else {
        console.log("Email sent:", info.response);
        resolve(info);
      }
    });
  });
}

module.exports = { sendEmailToSubscriber };
