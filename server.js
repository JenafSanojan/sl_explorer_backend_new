const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Stripe = require("stripe");


const hotelsRouter = require("./src/v1/routes/hotels/hotels.router");
const roundTripsRouter = require("./src/v1/routes/roundTrips/roundTrips.router");
const ordersRouter = require("./src/v1/routes/orders/orders.router");
const adminsRouter = require("./src/v1/routes/admins/admins.router");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./sl-explorer-firebase-adminsdk-f1771-328b42f1b0.json");
const dayTripsRouter = require("./src/v1/routes/dayTrips/dayTrips.router");
const festivalsRouter = require("./src/v1/routes/Festivals/festivals.router");
const categoryRouter = require("./src/v1/routes/dayTrips/category.router");
const wishlistsRouter = require("./src/v1/routes/wishlist/wishlist.router.js");
const cruiseShipRouter = require("./src/v1/routes/cruiseShips/cruiseShip.router.js");
const a_zRouter=require("./src/v1/routes/slA_Z/slA_Z.router.js");
const paymentRouter = require("./src/v1/routes/payments/payments.router.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://console.firebase.google.com/project/sl-explorer/database/sl-explorer-default-rtdb/data/~2F",
    storageBucket: "gs://sl-explorer.appspot.com",
  });
} catch (e) {
  console.log(e); 
}




app.use("/api/v1/hotels", hotelsRouter);
app.use("/api/v1/roundTrips", roundTripsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/setAdmin", adminsRouter);

app.use("/api/v1/dayTrips", dayTripsRouter);
app.use("/api/v1/festivals", festivalsRouter);
app.use("/api/v1/dayTips/category", categoryRouter);
app.use("/api/v1/admins", adminsRouter);
app.use("/api/v1/wishlists", wishlistsRouter);

app.use("/api/v1/cruiseShips",cruiseShipRouter);
app.use("/api/v1/a_z",a_zRouter);
app.use("/api/v1/payment",paymentRouter);

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
