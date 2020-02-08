const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

router.post(
  "/",
  // define input checks
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters")
      .isString()
      .isLength({ min: 6 })
  ],

  async (req, res) => {
    // console.log(req.body);
    // req.body requires app.use(express.json()) in server.js

    //check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({ name, email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.send("User Registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", (req, res) => {
  res.send("user information");
});

module.exports = router;
