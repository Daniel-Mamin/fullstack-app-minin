const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
  const query = {
    name: req.user.id,
  };

  // Для старта даты
  if (req.query.start) {
    query.date = {
      $gte: req.query.start,
    };
  }

  // Для конца даты
  if (req.query.end) {
    if (!query.date) {
      query.date = {};
    }

    query.date["$lte"] = req.query.end;
  }

  if (req.query.order) {
    query.order = +req.query.order;
  }

  try {
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit);

    res.status(200).json();
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {
    const lastOrder = await Order.findOne({ user: req.user.id }).sort({
      date: -1,
    });

    const maxOrder = lastOrder ? lastOrder : 0;

    const order = new Order({
      order: maxOrder + 1,
      list: req.body.list,
      user: req.user.id,
    });

    await order.save();

    res.status(201).json(order);
  } catch (e) {
    errorHandler(res, e);
  }
};
