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
    const { email, password } = req.body;

    try {
      // check for existing user
      const user = await User.findOne({ email });

      if (user)
        return res
          .status(400)
          .json({ success: false, message: "email already taken" });

      const hashedPassword = await argon2.hash(password);
      const newUser = new User({ email, password: hashedPassword });

      await newUser.save();
      // Return token
      const accessToken = jwt.sign(
        { userId: newUser._id, isAdmin: newUser.isAdmin },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({ success: true, message: "register successfully", accessToken, email });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  login = async (req, res) => {
    const { email, password } = req.body;

    // simple validation
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });

    try {
      // check for existing user
      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ success: false, message: "Incorrect email or password" });

      // Username found
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid)
        return res.status(400).json({ success: false, message: "Incorrect email or password" });

      // Return 
      const accessToken = jwt.sign(
        { userId: user._id, role: user.role, email: user.email },
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

  logout = (req, res) => {
    res.clearCookie('token')
    res.sendStatus(200)
  }

  deleteUser = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted...');
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  getAllUsers = async (req, res) => {
    const user = await User.find().select('email _id isAdmin');
    res.status(200).json(user);
  }
}
module.exports = new userController();