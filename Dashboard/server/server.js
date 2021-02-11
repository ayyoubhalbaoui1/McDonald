const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection is done");
});

app.use(express.static('upload'))

const categoryRouter = require("./routes/category");
app.use("/category", categoryRouter);

const sub_categoryRouter = require("./routes/sub_category");
app.use("/sub_category", sub_categoryRouter);

const product = require("./routes/product");
app.use("/product", product);

const ingrediant = require("./routes/ingrediant");
app.use("/ingrediant", ingrediant);

const promo_code = require("./routes/promo_code");
app.use("/code", promo_code);

const table_number = require("./routes/table_number");
app.use("/table", table_number);

app.listen(port, () => {
  console.log(` Server is running on port : ${port}`);
});
