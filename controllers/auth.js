const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../сonfig/keys");
const errorHandler = require("../utils/errorHandler");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );

    if (passwordResult) {
      const token = jwt.sign(
        {
          email: candidate.email,
          userId: candidate._id,
        },
        config.jwtKey,
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({
        token: `Bearer ${token}`,
      });
    } else {
      res.status(401).json({
        message: "Password mismatch! Try again!",
      });
    }
  } else {
    res.status(404).json({
      message: "No such user found! Try again!",
    });
  }
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({
    email: req.body.email,
  });

  if (candidate) {
    res.status(409).json({
      message: "This user already exists! Create another!",
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const { password } = req.body;

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};
