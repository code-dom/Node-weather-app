const path = require("path");
const express = require("express")
const hbs = require("hbs")

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Eman Ejaz"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Eman Ejaz"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }

  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error: error
        });
      } else {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            res.send({
              error: error
            });
          } else {
            res.send({
              forecast: forecastData,
              location: location
            });
          }
        });
      }
    }
  );
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
