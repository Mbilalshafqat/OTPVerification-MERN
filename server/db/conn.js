const mongoose = require("mongoose");

mongoose
  .connect(process.env.DTAT_URL)
  .then(() => {
    console.log("mongoose is coonetc successfuly");
  })
  .catch((error) => {
    console.log(`mongoose not connect ${error.mongoose}`);
  });
