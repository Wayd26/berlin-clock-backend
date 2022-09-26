var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var toDigitalTime = require("./routes/toDigitalTime");
var toBerlinTime = require("./routes/toBerlinTime");

var app = express();
var port = 3003;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/api/to-berlin-time", toBerlinTime);
app.use("/api/to-digital-time", toDigitalTime);

// Start the server
app.listen(port, () =>
  console.log(`berlin-clock-server app listening on port ${port}!`)
);

// Returning response with 404 when incorrect url is requested
app.use(function (req, res) {
  res.status(404).send({
    error: {
      errors: [
        {
          domain: "global",
          reason: "notFound",
          message: "Not Found",
          description:
            "Couldn't find the requested resource '" + req.originalUrl + "'",
        },
      ],
      code: 404,
      message: "Not Found",
    },
  });
});
