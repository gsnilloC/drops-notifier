const sneaksAPI = require("sneaks-api");
const sneaks = new sneaksAPI();
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const Subscribers = [
  {
    number: 9252734797,
    styleID: "FY2903",
    lastResellPrice: 475,
  },
  {
    number: 15107062277,
    styleID: "DD0587-600",
    lastResellPrice: 285,
  },
];

(async function () {
  const sneakerMap = getSneakerMap(subscribers);
  for (const subscriber of subscribers) {
    if (
      sneakerMap[subscriber.styleID].price <
      subscriber.lastResellPrice - 10
    ) {
      notifySubscriber(sneakerMap[subscriber.styleID], subscriber.number);
    }
    subscriber.lastResellPrice = sneakerMap[subscriber.styleID].price;
  }
})();

async function getSnakerMap(subscribers) {
  var sneakerMap = new Object();

  for (const subscriber of subscribers) {
    if (sneakerMap[subscriber.styleID]) {
      const sneaker = await sneaksApiFunctionWrapper(subscriber.styleID);
    }
  }

  return sneakerMap;
}

function notifySubscriber(sneaker, number) {
  console.log(sneaker);
  twilio.messages
    .create({
      body:
        "Price Dropped - " +
        sneaker.name +
        " has dropped to $" +
        sneaker.price +
        " on " +
        sneaker.site +
        ": " +
        sneaker.url,
      from: process.env.TWILIO_NUMBER,
      to: number,
    })
    .then((message) => console.log(message.sid));
}
