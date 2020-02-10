const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Expense = require("../../models/Expense");

// ADD AN EXPENSE
router.post(
  "/",
  [
    auth,
    [
      check("name", "Expense name is required")
        .not()
        .isEmpty(),
      check("date", "Date is required")
        .not()
        .isEmpty(),
      check("amount", "Amount is required")
        .not()
        .isEmpty(),
      check("method", "Method of payment is required")
        .not()
        .isEmpty(),
      check("category", "Category is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req); //check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newExpense = new Expense({
        name: req.body.name,
        date: req.body.date,
        amount: req.body.amount,
        method: req.body.method,
        category: req.body.category,
        memo: req.body.memo,
        user: req.user.id
      });

      const expense = await newExpense.save();

      res.json(expense);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// GET ALL EXPENSES FOR USER
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET A SINGLE USER EXPENSE
router.get("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    res.json(expense);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Expense not found" });
    }

    res.status(500).send("Server Error");
  }
});

// DELETE A USER EXPENSE
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ msg: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await expense.remove();

    res.json({ msg: "Expense deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Expense not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;