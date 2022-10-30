const router = require("express").Router();
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
dotenv.config();
const { currentUser } = require("../passport");

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/// request otp

router.get("/requestVerification", async (req, res) => {
  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verifications.create({
      to: `+${req.query.phone}`,
      channel: "sms",
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(err));
});

/// verify otp

router.get("/verify", async (req, res) => {
  const user =
    (await User.findOne({
      phone: `+${req.query.phone}`,
    })) ||
    (await User.findOne({
      email: currentUser.email,
    }));

  client.verify
    .services(process.env.TWILIO_SERVICE_ID)
    .verificationChecks.create({
      to: `+${req.query.phone}`,
      code: req.query.code,
    })
    .then(async (data) => {
      if (user) {
        user.updateOne({
          $set: {
            phone: `+${req.query.phone}`,
            ...user,
          },
        });
        res.status(200).json(user);
      } else {
        const newUser = new User({
          phone: `+${req.query.phone}`,
          age: null,
          email: null,
          gender: null,
          height: 0,
          images: [],
          interests: [],
          languages: [],
          liked: [],
          likesRecieved: [],
          name: null,
          preferredAge: { from: 18, to: 35 },
          preferredGender: null,
          sexualOrientation: null,
          uid: uuidv4(),
          appleId: null,
          bio: null,
          city: null,
          company: null,
          education: null,
          location: {},
          job: null,
          username: null,
          premiumPlans: { gold: false, platinum: false, plus: false },
        });
        const user = await newUser.save();
        res.status(200).json(user);
      }

      res.status(200).json(data);
    })
    .catch((err) => res.status(400).json(err));
});

/// google authentication

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/success",
    failureRedirect: "/login/failed",
  })
);

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failed",
  });
});
router.get("/login/success", (req, res) => {
  res.redirect(process.env.CLIENT_URL);
  console.log("logged in");
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.CLIENT_URL);
    console.log("logged out");
  });
});

///  apple

// app.get("/auth/apple", passport.authenticate("apple"));

// app.get(
//   "/auth/apple/callback",
//   passport.authenticate("apple", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/");
//   }
// );

module.exports = router;
