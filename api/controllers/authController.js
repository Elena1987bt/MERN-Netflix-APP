const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req, res) => {
  try {
    // 1. Check if the user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .json({ message: 'No user with that email address!' });
    // 2. Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: 'Invalid credentials!' });

    const { password, ...info } = user._doc;

    // 3. If there is a user and password is correct crate jwt
    const token = jwt.sign(
      { isAdmin: user.isAdmin, id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({ result: info, token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong!', error: error.message });
  }
};
exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    // 1. Check if the user exist
    const user = await User.findOne({ email: email });
    if (user) return res.status(404).json({ message: 'User already exists!' });

    // 2. Check if password is equal to confirmPassword
    if (password !== confirmPassword) {
      res.status(404).json({ message: 'Password do not match' });
    }

    //  3. Hash the Password
    const hashedPassword = await bcrypt.hash(password, 12);
    // 4. Create User
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    newUser.save();
    // 5. Create jwt
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
    res.status(201).json({ result: newUser, token });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Something went wrong ', error: error.message });
  }
};
