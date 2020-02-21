const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  payee: {
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
  },
  category: {
    type: String,
  },
  memo: {
    type: String
  }
});

module.exports = Expense = mongoose.model("expense", ExpenseSchema);
