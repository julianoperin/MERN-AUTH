const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayedName } = req.body;

    //! Validation
    if (!email || !password || !passwordCheck)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The passwowrd needs to be at least 5 characters long." });

    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Enter the same password" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({ msg: "Account already exists." });

    // if (!displayName) displayName = email;

    //! HASH
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayedName,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //!validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered!" });

    //! Compare bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Password does not match!" });

    //! JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        displayedName: user.displayedName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
