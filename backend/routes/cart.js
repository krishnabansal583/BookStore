const router = require("express").Router();
const User = require("../models/user.js");
const Book = require("../models/book.js");
const { authenticateToken } = require("./userAuth");

//put book to cart

router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookinCart = userData.cart.includes(bookid);
    if (isBookinCart) {
      return res.json({
        status: "Success",
        message: "Book is already in cart",
      });
    }
    await User.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book added to cart",
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

//remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookid },
    });
    return res.json({
      status: "Success",
      message: "Book removed from cart",
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get cart of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id);
    const userCartId = userData.cart;
    let userCart = [];
    for (let i = 0; i < userCartId.length; i++) {
      const newCart = await Book.findById(userCartId[i]);
      if (!newCart) {
        return res.status(500).json({ message: "invalid id" });
      }
      userCart.push(newCart);
    }

    return res.json({
      status: "Success",
      data: userCart,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;
