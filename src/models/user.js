const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "product", //mengacu pada folder models > file product.js line 28
          required: true,
        },
        quantity: { type: Number, require: true },
      },
    ],
  },
});

UserSchema.methods.addToCart = function (product) {
  //
  //check existing product
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  //
  //copy dari cart/keranjang yg sudah ada
  const updatedcartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    //product ada di keranjang
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedcartItems[cartProductIndex].quantity = newQuantity;
  } else {
    //product baru tidak ada di keranjang
    updatedcartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedcartItems,
  };

  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", UserSchema);
