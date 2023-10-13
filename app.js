const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db");
const port = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
// Define a simple route
app.use((req, res, next) => {
  res.header("Referrer-Policy", "strict-origin-when-cross-origin");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/auth", require("./controllers/Authentication/controller"));
// app.use("/api/order", require("./controllers/Order/controller"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
