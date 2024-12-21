const router = require("express").Router();
const User = require("../models/user.js");
const { authenticateToken } = require("./userAuth");
const Order = require("../models/order.js");
const Book = require("../models/book.js");
//place an order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      //saving Order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      //clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});
// get order history of particulat user

router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await Order.find({ user: id });
    const orderHistory = [];
    for (i = 0; i < userData.length; i++) {
      let needBook = await Book.findById(userData[i].book).lean();
      needBook.status = userData[i].status; // Adding the new field
      orderHistory.push(needBook);
    }
    return res.json({
      status: "Success",
      data: orderHistory,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get all orders-- admin

router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    const bookIds = orders.map((order) => order.book);

    const userIds = orders.map((order) => order.user);

    const books = await Book.find({ _id: { $in: bookIds } });

    const users = await User.find({ _id: { $in: userIds } });

    const ordersWithData = orders.map((order) => {
      const book = books.find(
        (book) => book._id.toString() === order.book.toString()
      );
      const user = users.find(
        (user) => user._id.toString() === order.user.toString()
      );

      return {
        _id: order._id,
        createdAt: order.createdAt,
        status: order.status,
        book: book,
        user: user,
      };
    });

    res.json({ status: "Success", data: ordersWithData });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

//update order --admin

router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status: receivedStatus } = req.body;
    const status = receivedStatus || "Order Placed";
    if (!status) {
      status = "Order Placed";
    }
    await Order.findByIdAndUpdate(id, { status: status });
    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;
