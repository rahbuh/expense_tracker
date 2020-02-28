const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const checkAuth = require("../../middleware/check-auth");
const defaultList = require("../../config/lists");

const User = require("../../models/User");
const Category = require("../../models/Category");
const PayType = require("../../models/PayType");

// USER REGISTRATION
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters")
      .isString()
      .isLength({ min: 6 })
  ],
  async (req, res) => {
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

      // create default categories and pay types for user
      categories = new Category({user: user.id, categories: [...defaultList.categories]})
      payType = new PayType({user: user.id, payType: [...defaultList.methods]})

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      await categories.save();
      await payType.save();

      res.json({ success: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
);

// GET EXPENSE CATEGORIES FOR USER
router.get("/categories", checkAuth, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});

// GET EXPENSE PAYMENT TYPES FOR USER
router.get("/paytype", checkAuth, async (req, res) => {
  try {
    const paytypes = await PayType.find({ user: req.user.id });
    res.json(paytypes[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
});


module.exports = router;
