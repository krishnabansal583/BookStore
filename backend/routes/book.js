const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Add book -- admin
router.post("/add-book", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(400).json({ message: "You are not authorized to perform admin work" });
    }

    const {
      bookTitle,
      authorName,
      price,
      imageURL,
      category,
      bookDescription,
      bookPDFURL,
    } = req.body;

    // Ensure price is stored as a string with $ symbol
    const formattedPrice = `$${parseFloat(price)}`;

    const book = new Book({
      bookTitle,
      authorName,
      price: formattedPrice,
      imageURL,
      category,
      bookDescription,
      bookPDFURL,
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully", data: book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Update book -- admin
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;

    const {
      bookTitle,
      authorName,
      price,
      imageURL,
      category,
      bookDescription,
      bookPDFURL
    } = req.body;

    await Book.findByIdAndUpdate(bookid, {
      bookTitle,
      authorName,
      price,
      imageURL,
      category,
      bookDescription,
      bookPDFURL
    });

    return res.status(200).json({ message: "Book updated successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Delete book -- admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({ status: "Success", data: books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Get recently added books
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({ status: "Success", data: books });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

// Get book by ID
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({ status: "Success", data: book });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
