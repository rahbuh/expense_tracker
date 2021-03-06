const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  categories: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model("Category", CategorySchema);