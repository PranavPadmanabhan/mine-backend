const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    name: { type: String || null, required: false },
    age: { type: Number || null, required: false },
    gender: { type: String || null, required: false },
    sexualOrientation: { type: String || null, required: false },
    preferredGender: { type: String || null, required: false },
    height: { type: Number || null, required: false },
    languages: { type: [String], required: false },
    username: { type: String || null, required: false, unique: false },
    email: { type: String || null, required: false, unique: true },
    phone: { type: String || null, required: false, unique: true },
    appleId: { type: String, required: false },
    location: { type: { type: String }, coordinates: [Number] || null },
    education: { type: String || null, required: false },
    job: { type: String || null, required: false },
    company: { type: String || null, required: false },
    bio: { type: String || null, required: false },
    interests: { type: [String] || null, required: true },
    images: { type: [String], required: false },
    city: { type: String || null, required: false },
    liked: { type: [String] || null, required: false },
    likesRecieved: { type: [String] || null, required: false },
    preferredAge: {
      type: { from: { type: Number }, to: { type: Number } },
      required: true,
    },
    premiumPlans: {
      type: {
        plus: { type: Boolean },
        gold: { type: Boolean },
        platinum: { type: Boolean },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
