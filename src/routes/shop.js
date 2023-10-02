const express = require("express");
const shopController = require("../controllers/shop");
const router = express.Router();

router.post("/post-item-cart", shopController.postItemCart);

router.get("/categories", shopController.getCategories);

module.exports = router;
