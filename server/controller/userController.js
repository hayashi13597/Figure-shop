const User = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class userController {
  loggedIn = async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) return res.status(400).json({
        success: false,
        message: 'User not found'
      })
      res.json({ success: true, user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }

  registerUser = async (req, res) => {
    const { username, password } = req.body;

    // simple validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username or password" });
    try {
      // check for existing user
      const user = await User.findOne({ username });

      if (user)
        return res
          .status(400)
          .json({ success: false, message: "username already taken" });
      //
      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ username, password: hashedPassword });

      await newUser.save();

      // Return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ success: true, message: "user successfully", accessToken });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  login = async (req, res) => {
    const { username, password } = req.body;

    // simple validation
    if (!username || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing username or password" });

    try {
      // check for existing user
      const user = await User.findOne({ username });

      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });

      // Username found
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect username or password" });

      // Return 
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "user logged successfully",
        accessToken
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
}
module.exports = new userController();