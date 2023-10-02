const Product = require("../models/product");
const { validationResult } = require("express-validator");

//Add Product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  // const imageUrl = req.body.imageUrl;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validasi gagal karena input data salah");
    error.statusCode = 422;
    res.send({ gagal: error });
  }

  if (!req.file) {
    const error = new Error("Image belum lengkap");
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = req.file.path.replace("\\", "/");

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user,
  });
  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Created Product");
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get Products
exports.getProducts = (req, res, next) => {
  const search = req.query.search;
  const price = query.price;

  let myquery = Product.find().select("title price -_id");

  if (search) {
    console.log(search);
    myquery.where("title").equals({ $regex: search });
  }

  if (price) {
    myquery.where("price").gt(price);
  }

  myquery
    .populate("userId", "name email -_id")
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));

  //   if (search) {
  //     // Product.find({ title: { $regex: search } }, "title price")
  //     Product.find()
  //       .select("title price -_id")
  //       .where("title")
  //       .equals(search)
  //       .where("price")
  //       .gt(price)
  //       .then((result) => {
  //         res.json(result);
  //       })
  //       .catch((err) => console.log(err));
  //   } else {
  //     Product.find()
  //       .then((result) => {
  //         res.json(result);
  //       })
  //       .catch((err) => console.log(err));
  //   }
};

//delete update
