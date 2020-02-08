const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Expense = require("../../models/Expense");

router.post("/", [auth, []], async (req, res) => {
  // find user by id
  // create new expense object
  // save to db
  // return expense information - res.json(expense)
});


module.exports = router;
