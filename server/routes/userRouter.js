const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const gravatar = require("gravatar");

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password } = req.body;

    try {
      const ifUserExists = await User.findOne({ email: email });
      if (ifUserExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      //get avatar
      let avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      let isAdmin = false;
      const newUser = new User({
        name,
        email,
        password,
        avatar,
        isAdmin,
      });

      //save to DB
      await newUser.save();
      res.status(200).json({
        msg: "User registered successfully",
      });
    } catch (error) {
      res.status(500).json({
        errors: [{ msg: error.message }],
      });
    }
  }
);

//user login

router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      //check user registered or not
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Invalid creds." }] });
      }
      //compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid creds." }] });
      }
      //create and assign token  once user authenticated
      let payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      jwt.sign(
        payload,
        process.env.jwt_secret_key,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) throw err;
          res
            .status(200)
            .json({ msg: "Login successful", token: token, user: user });
        }
      );
    } catch (error) {
      res.status(500).json({
        errors: [{ msg: error.message }],
      });
    }
  }
);

module.exports = router;
