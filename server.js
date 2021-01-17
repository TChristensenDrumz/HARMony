const express = require('express');

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/HarmonyDB",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);


app.listen(PORT, () => {
  console.log('Server listening on http://localhost:8080');
});
