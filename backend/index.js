import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import session from "express-session";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import Users from "./models/UserModel.js";
import Products from "./models/ProductModel.js";

dotenv.config();
const app = express();

// create table at database
// (async () => {
//   await db.authenticate().then(() => console.log('DB CONNECTED')).catch((err) => console.log(err))
// })();

// Users.sync();
// Products.sync();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credential: true,
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running..");
});
