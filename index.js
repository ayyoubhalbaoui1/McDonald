const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const subcategoryRouter = require("./routes/subcategory");
const ingredientRouter = require("./routes/ingredient");
const codepromoRouter = require("./routes/codepromo");
const servicetableRouter = require("./routes/servicetable");
const cardfideleRouter = require("./routes/cardfidele");
const commandeRouter = require("./routes/commande");
// require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost/mcdonald";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection is done");
});

app.use("/category", categoryRouter);
app.use("/products", productRouter);
app.use("/subcategory", subcategoryRouter);
app.use("/ingredient", ingredientRouter);
app.use("/codepromo", codepromoRouter);
app.use("/servicetable", servicetableRouter);
app.use("/cardfidele", cardfideleRouter);
app.use("/commande", commandeRouter);
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
