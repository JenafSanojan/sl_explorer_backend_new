const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const hotelsRouter = require("./src/v1/routes/hotels/hotels.router");
const roundTripsRouter = require("./src/v1/routes/roundTrips/roundTrips.router");
const ordersRouter = require("./src/v1/routes/orders/orders.router");
const adminsRouter = require("./src/v1/routes/admins/admins.router");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./sl-explorer-firebase-adminsdk-f1771-328b42f1b0.json");

app.use(express.json());

app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://console.firebase.google.com/project/sl-explorer/database/sl-explorer-default-rtdb/data/~2F",
});

app.use("/api/v1/hotels", hotelsRouter);
app.use("/api/v1/roundTrips", roundTripsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/setAdmin", adminsRouter);

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("App is listening on port " + listener.address().port);
});

mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.tvve4wa.mongodb.net/?retryWrites=true"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
