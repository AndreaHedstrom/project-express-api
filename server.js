import express from "express";
import cors from "cors";
//import booksData from "./data/books.json";
import fullMoonData from "./data/csvjson.json";


//import avocadoSalesData from "./data/avocado-sales.json";
// import goldenGlobesData from "./data/golden-globes.json";
// import netflixData from "./data/netflix-titles.json";
// import topMusicData from "./data/top-music.json";

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();
const listEndpoints = require('express-list-endpoints')
// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());


// Start defining your routes here
app.get("/", (request, response) => {
  response.json(listEndpoints(app));
})

//Show all data
app.get("/fullmoon", (request, response) => {
  const fullmoon = fullMoonData;
  if (fullmoon) {
    response.status(200).json({
      success: true,
      message: "ok",
      body: {
        fullMoonData: fullmoon
      }
    });
  } else {
    response.status(500).json({
      success: false,
      message: "Something went wrong",
      body: {}
    });
  } 
})

//Endpoint for one specific date
app.get("/fullmoon/date/:date", (request, response) => {
  const singleFullmoon = fullMoonData.find((fullmoon) => {
    const fullmoonDate = new Date(fullmoon.Date);
    const requestDate = new Date(request.params.date);
    return fullmoonDate.getTime() === requestDate.getTime();
  });

  if (singleFullmoon) {
    response.status(200).json({
      success: true,
      message: "ok",
      body: {
        fullmoon: singleFullmoon
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "No fullmoon this date",
      body: {}
    });
  } 
});

//Endpoint for different weekdays
app.get("/fullmoon/weekday/:weekday", (request, response) => {
  const weekday = request.params.weekday.toLowerCase();
  const weekdayWithFullmoon = fullMoonData.filter((day) => day.Day.toLocaleLowerCase() === weekday)

  if (weekdayWithFullmoon.length > 0) {
    response.status(200).json({
      success: true,
      message: "ok",
      body: {
        weekdayFullmoons: weekdayWithFullmoon
      }
    });
  } else {
    response.status(404).json({
      success: false,
      message: "No fullmoon this day",
      body: {}
    });
  } 
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
