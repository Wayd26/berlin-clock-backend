"use strict";
const Joi = require("joi");

// Retrieve all the old convertion
exports.getAllConvertion = function (req, res) {
  //TODO Retrieve all the old convertion berlinTimeToDigitalTime

  res.send({
    status: "success",
    message: "To digital time convertion historic",
    data: [
      {
        h: 23,
        m: 59,
        s: "odd",
        converted: "23:59",
        original: {
          source: "ORRRRRRROYYRYYRYYRYYYYYY",
        },
      },
      {
        h: 0,
        m: 0,
        s: "event",
        converted: "00:00",
        original: {
          source: "YOOOOOOOOOOOOOOOOOOOOOOO",
        },
      },
      {
        h: 16,
        m: 50,
        s: "event",
        converted: "16:50",
        original: {
          source: "YRRROROOOYYRYYRYYRYOOOOO",
        },
      },
    ]
  });
};

// Create convertion
exports.newConvertion = function (req, res) {
  //TODO Create convertion berlinTimeToDigitalTime

  const { body } = req;

  const dateschema = Joi.object().keys({
    source: Joi.string().required().max(24).min(24),
  });

  const result = dateschema.validate(body);
  const { error } = result;

  if (error != null) {
    const { details } = error;
    const message = details.map((i) => i.message);

    res.status(422).json({
      status: "failed",
      message: message,
      data: body,
    });
  } else {
    let h = 0;

    body.source
      .substring(1, 5)
      .split("")
      .forEach((item) => {
        if (item == "R") h = h + 5;
      });

    body.source
      .substring(5, 9)
      .split("")
      .forEach((item) => {
        if (item == "R") h = h + 1;
      });

    let m = 0;

    body.source
      .substring(9, 20)
      .split("")
      .forEach((item) => {
        if (item != "O") m = m + 5;
      });

    body.source
      .substring(20)
      .split("")
      .forEach((item) => {
        if (item == "Y") m = m + 1;
      });

    let s = body.source[0] == "Y" ? "event" : "odd";

    res.json({
      status: "success",
      message: "Converted in digital time",
      data: {
        h: h,
        m: m,
        s: s,
        converted:
          "0".repeat(2 - h.toString().length) +
          h +
          ":" +
          "0".repeat(2 - m.toString().length) +
          m,
        original: body,
      },
    });
  }
};
