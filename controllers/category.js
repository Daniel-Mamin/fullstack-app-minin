const Category = require("../models/Category");
const Position = require("../models/Position");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
  try {
    const categories = await Category.find({ user: req.user.id });

    res.status(200).json(categories);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id);

    res.status(200).json(category);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async function (req, res) {
  try {
    await Category.deleteOne({ _id: req.params.id });
    await Position.deleteMany({ category: req.params.id });

    res.status(200).json({
      message: "The category has been deleted!",
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {
  try {
  } catch (e) {
    errorHandler(res, e);
  }
};
