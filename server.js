const { urlencoded } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/Auth");
const userRouter = require("./routes/users");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const passportSetup = require("./passport");

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("MongoDb connection successfull");
  })
  .catch((err) => console.log(err));

app.use(
  session({
    secret: "minebackend",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use(urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/", userRouter);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
