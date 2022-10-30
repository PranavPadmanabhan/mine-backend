const router = require("express").Router();
const User = require("../models/User");

router.get("/users", async (req, res) => {
  User.collection.find().toArray((err, data) => {
    console.log(data);
    res.status(200).json({ users: data });
  });
});

module.exports = router;
