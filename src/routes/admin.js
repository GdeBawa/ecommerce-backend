const express = require("express");
const prodController = require("../controllers/product");
const router = express.Router();
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

router.post(
  "/add-product",
  [
    // body("title").trim().isLength({ min: 3 }),
    // body("price").trim().isLength({ min: 3 }),
    // body("price").isInt(),
  ],
  isAuth,

  prodController.postAddProduct
);
router.get("/get-products", prodController.getProducts);

module.exports = router;
