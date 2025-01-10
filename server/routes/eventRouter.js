const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const authenticateUser = require("../middleware/authenticate");
const Event = require("../models/Event");

//upload event
router.post(
  "/upload",
  authenticateUser,
  [
    body("name").notEmpty().withMessage("Name required."),
    body("image").notEmpty().withMessage("Image required."),
    body("date").notEmpty().withMessage("Date required."),
    body("type").notEmpty().withMessage("Type required."),
    body("price").notEmpty().withMessage("Price required."),
    body("info").notEmpty().withMessage("Information required."),
  ],
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, image, date, type, price, info } = request.body;
      const event = new Event({
        user: request.user.id,
        name,
        image,
        date,
        type,
        price,
        info,
      });
      await event.save();
      response.send({
        msg: "Event uploaded successfully",
        event: event,
      });
    } catch (error) {
      response.status(500).send("Server Error");
    }
  }
);

//get free events
router.get("/free", async (request, response) => {
  try {
    const events = await Event.find({ type: "FREE" });
    response.status(200).json({
      FreeEvents: events,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      errors: [{ errors: errors.message }],
    });
  }
});

//get pro events

router.get("/pro", authenticateUser, async (request, response) => {
  try {
    const events = await Event.find({ type: "PRO" });
    if (events.length === 0) {
      return response.status(500).json({
        msg: "No events found",
      });
    }
    return response.status(200).json({ ProEvents: events });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      errors: [{ errors: errors.message }],
    });
  }
});

//get a event by id
router.get("/:id", async (request, response) => {
  try {
    const event = await Event.findById(request.params.id);
    if (!event) {
      return response.status(404).json({ msg: "Event not found" });
    }
    response.status(200).json({ event: event });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      errors: [{ errors: error.message }],
    });
  }
});

module.exports = router;
