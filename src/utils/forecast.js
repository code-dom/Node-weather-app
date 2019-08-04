const resquest = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/edd3a5e0a29012b76790bf506f6fb92d/" +
    latitude +
    "," +
    longitude +
    "?units=si";

  resquest({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to find the weather forcast services!", undefined);
    } else if (response.body.error) {
      callback(
        "Unable to find the location. Pls try some other location pls!..",
        undefined
      );
    } else {
      callback(
        undefined,
        response.body.daily.data[0].summary +
          "It is currently " +
          response.body.currently.temperature +
          " degrees out. There is " +
          response.body.currently.precipProbability +
          " chances of rain."
      );
    }
  });
};

module.exports = forecast;
