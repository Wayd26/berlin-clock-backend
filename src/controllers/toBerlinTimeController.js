"use strict";
const Joi = require("joi");

// Retrieve all the old convertion
exports.getAllConvertion = function (req, res) {
  //TODO Retrieve all the old convertion digitalTimeToBerlinTime
  res.send({
    status: "success",
    message: "To berlin time convertion historic",
    data: [
      {
        h_f: "RRRR",
        h_s: "RRRO",
        m_f: "YYRYYRYYRYY",
        m_s: "YYYY",
        s: "O",
        converted: "ORRRRRRROYYRYYRYYRYYYYYY",
        original: {
          hours: 23,
          minutes: 59,
          seconds: 59,
        },
      },
      {
        h_f: "RRRO",
        h_s: "ROOO",
        m_f: "YYRYYRYYRYO",
        m_s: "OOOO",
        s: "Y",
        converted: "YRRROROOOYYRYYRYYRYOOOOO",
        original: {
          hours: 16,
          minutes: 50,
          seconds: 6,
        },
      },
      {
        h_f: "RROO",
        h_s: "ROOO",
        m_f: "YYRYYRYOOOO",
        m_s: "YYOO",
        s: "O",
        converted: "ORROOROOOYYRYYRYOOOOYYOO",
        original: {
          hours: 11,
          minutes: 37,
          seconds: 1,
        },
      },
    ],
  });
};

// Create convertion
exports.newConvertion = function (req, res) {
  const { body } = req;

  const dateschema = Joi.object().keys({
    hours: Joi.number().required().max(23).min(0),
    minutes: Joi.number().required().max(59).min(0),
    seconds: Joi.number().required().max(59).min(0),
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
    // s logical
    let s = body.seconds % 2 == 0 ? "Y" : "O";

    // m_s logical
    let m_s = "Y".repeat(body.minutes % 5) + "O".repeat(4 - (body.minutes % 5));

    // m_f logical
    let m_f =
      "Y".repeat(parseInt(body.minutes / 5)) +
      "O".repeat(11 - parseInt(body.minutes / 5));
    let r_index = 3;
    while (r_index <= parseInt(body.minutes / 5)) {
      m_f = m_f.substring(0, r_index - 1) + "R" + m_f.substring(r_index);
      r_index += 3;
    }

    // h_s logical
    let h_s = "R".repeat(body.hours % 5) + "O".repeat(4 - (body.hours % 5));

    // h_f logical
    let h_f =
      "R".repeat(parseInt(body.hours / 5)) +
      "O".repeat(4 - parseInt(body.hours / 5));

    res.json({
      status: "success",
      message: "Converted in berlin time",
      data: {
        h_f: h_f,
        h_s: h_s,
        m_f: m_f,
        m_s: m_s,
        s: s,
        converted: s + h_f + h_s + m_f + m_s,
        original: body,
      },
    });
  }
};
