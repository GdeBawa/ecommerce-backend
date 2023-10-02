const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./src/routes/admin");
const shopRoutes = require("./src/routes/shop");
const user = require("./src/models/user");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const authRoute = require("./src/routes/auth");
const env = require("dotenv");

const cookieParser = require("cookie-parser");
app.use(cookieParser());

env.config();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//upload image
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb singkatan dari callback
    cb(null, "images"); //'images' adalah nama folder
  },

  filename: function (req, file, cb) {
    cb(null, uuidv4() + file.originalname);
  },
});

//tentukan format file yg ingin diupload
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//middleware upload image dg multer
//image yg diupload belum multiple
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("file")
);

app.use((req, res, next) => {
  user
    .findById("64d2375cdaaf0cbb0150ec6d") //dapat dari database test tabel users
    .then((resUser) => {
      req.user = resUser;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/auth", authRoute);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://baawagde20:fbjsUzqly2F4XTZi@cluster0.saztirl.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    app.listen(8000);
  })
  .catch((err) => console.log(err));
