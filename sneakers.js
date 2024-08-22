const sneaksAPI = require("sneaks-api");
const sneaks = new sneaksAPI();

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

module.exports = { sneaksApiFunctionWrapper };
