const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const hashedPasword = bcrypt.hashSync(req.body.password, 10);
    await User.create({
      username: req.body.username,
      password: hashedPasword,
    });
    return res.status(200).json({ msg: "Registration successful" });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ msg: "Please insert username and password" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "Username doesnt exist" });
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    return res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/check", auth, (req, res) => {
  const token = jwt.sign(
    { id: req.user.id, username: req.user.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  return res.status(200).json({ token });
});

// trba da sredim tokene

module.exports = router;
