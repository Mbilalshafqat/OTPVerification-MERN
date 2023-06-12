const express = require("express");
const app = express();

// --------------cors
const cors = require("cors");
app.use(cors());

// ------------body-parser
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// ------------- dotenv
require("dotenv").config();

// ------------- mongoose connectoion call
require("../server/db/conn");

// ------------- router
app.use("/user", require("./Router/UserRouter"));

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
