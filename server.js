const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const app = require("./app");

const conString = process.env.CONNECTIONSTRING.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose
  .connect(conString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

app.listen(process.env.PORT, () => {
  console.log("server is runnig fine...testtting...");
});
