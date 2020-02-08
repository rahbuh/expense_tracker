const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  memo: {
    type: String
  }
});

module.exports = Expense = mongoose.model("expense", ExpenseSchema);
