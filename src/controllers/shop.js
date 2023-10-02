const { response } = require("express");
const Product = require("../models/product");
const axios = require("axios");

exports.postItemCart = (req, res, next) => {
  //cek item dalam database
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((resProduct) => {
      return req.user.addToCart(resProduct);
    })
    .then((resultAdd) => {
      res.json(resultAdd);
    })
    .catch((err) => console.log(err));
};

exports.getCategories = (req, res, next) => {
  // axios
  //   .get("https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/categories")
  //   .then((response) => {
  //     // res.json(response.data); //dalam axios hasil atau respon ada dalam field "data"
  //     let result = response.data;//manggil field nama dalam postman
  //     res.json(result[0].name);
  //   })
  //   .catch((error) => console.log(error));

  getCategories()
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => console.log(error));
};

//async await
async function getCategories() {
  try {
    const resp = await axios.get(
      "https://63cdf885d2e8c29a9bced636.mockapi.io/api/v1/categories"
    );
    return resp;
  } catch (error) {
    console.log(error);
  }
}
