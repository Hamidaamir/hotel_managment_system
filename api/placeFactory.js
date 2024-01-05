// placeFactory.js
const Place = require("./models/Place.js");

class PlaceFactory {
  createPlace(
    owner,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price
  ) {
    return new Place({
      owner,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
  }
}

module.exports = new PlaceFactory();
