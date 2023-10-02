const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const CartSchema = new Schema({
  createdAt: {
    type: Date,
    allowNull: true,
  },
  updatedAt: {
    type: Date,
    allowNull: true,
  },
  userId: {
    type: Date,
    allowNull: false,
  },
});

module.exports = mongoose.model("cart", CartSchema);
