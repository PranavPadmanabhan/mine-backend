const googleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const dotenv = require("dotenv");
const User = require("./models/User");
const { v4: uuidv4 } = require("uuid");
// const AppleStrategy = require("passport-appleid");

dotenv.config();

const currentUser = new User();

passport.use(
  new googleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        const newUser = new User({
          phone: null,
          age: null,
          email: profile.emails[0].value,
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
        currentUser.uid = user.uid;
        currentUser.name = user.name;
        currentUser.age = user.age;
        currentUser.gender = user.gender;
        currentUser.sexualOrientation = user.sexualOrientation;
        currentUser.preferredGender = user.preferredGender;
        currentUser.height = user.height;
        currentUser.languages = user.languages;
        currentUser.username = user.username;
        currentUser.email = user.email;
        currentUser.phone = user.phone;
        currentUser.appleId = user.appleId;
        currentUser.location = user.location;
        currentUser.education = user.education;
        currentUser.job = user.job;
        currentUser.company = user.company;
        currentUser.bio = user.bio;
        currentUser.interests = user.interests;
        currentUser.images = user.images;
        currentUser.city = user.city;
        currentUser.liked = user.liked;
        currentUser.likesRecieved = user.likesRecieved;
        currentUser.preferredAge = user.preferredAge;
        currentUser.premiumPlans = user.premiumPlans;
        // console.log(googleAuthResponse);
      } else {
        currentUser.uid = user.uid;
        currentUser.name = user.name;
        currentUser.age = user.age;
        currentUser.gender = user.gender;
        currentUser.sexualOrientation = user.sexualOrientation;
        currentUser.preferredGender = user.preferredGender;
        currentUser.height = user.height;
        currentUser.languages = user.languages;
        currentUser.username = user.username;
        currentUser.email = user.email;
        currentUser.phone = user.phone;
        currentUser.appleId = user.appleId;
        currentUser.location = user.location;
        currentUser.education = user.education;
        currentUser.job = user.job;
        currentUser.company = user.company;
        currentUser.bio = user.bio;
        currentUser.interests = user.interests;
        currentUser.images = user.images;
        currentUser.city = user.city;
        currentUser.liked = user.liked;
        currentUser.likesRecieved = user.likesRecieved;
        currentUser.preferredAge = user.preferredAge;
        currentUser.premiumPlans = user.premiumPlans;
      }
      return callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

/// apple

// passport.use(
//   new AppleStrategy(
//     {
//       clientID: APPLE_SERVICE_ID,
//       callbackURL: "http://localhost:5000/auth/apple/callback",
//       teamId: APPLE_TEAM_ID,
//       keyIdentifier: "RB1233456",
//       privateKeyPath: path.join(__dirname, "./AuthKey_RB1233456.p8"),
//     },
//     function (accessToken, refreshToken, profile, done) {
//       const id = profile.id;
//       done(err, user);
//     }
//   )
// );

module.exports = { currentUser };
