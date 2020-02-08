const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// USER REGISTRATION
router.post(
  "/",
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
    const errors = validationResult(req); //check for errors
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body; //get input from header

    try {
      let user = await User.findOne({ email }); //check db if user already exists

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({ name, email, password }); //create new user instance

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); //encrypt password

      await user.save(); //save user to db

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign( payload, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
