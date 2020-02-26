const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayTypeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  payType: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = PayType = mongoose.model("PayType", PayTypeSchema);
