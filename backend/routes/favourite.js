const router = require("express").Router();
const User = require("../models/user.js");
const Book = require("../models/book.js");
const { authenticateToken } = require("./userAuth");

//add book to favourite

router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// remove from favourite

router.put(
  "/remove-book-from-favourite",
  authenticateToken,
  async (req, res) => {
    try {
      const { bookid, id } = req.headers;
      const userData = await User.findById(id);
      
      const newFav = userData.favourites.filter(items => items != bookid);
      console.log(newFav);
      const check = await User.findOneAndUpdate({_id : id}, { favourites: newFav }, {new : true});
      if(!check){
        res.status(501).json({message : "error in updting fav"});
      }
      return res.status(200).json({ message: "Book removed from favourite" });
    } catch (error) {
      console.log("here");
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//get Favourite books of a particular user

router.get("/get-favourite-books", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    console.log(id);
    // const userData = await User.findById(id).populate("favourites");
    const userData = await User.findById(id);
    const fav = userData.favourites;
    console.log(fav);
    const booksNeed = [];
    for(let i = 0; i < fav.length; i++){
      const book = await Book.findById(fav[i]);
      if(!book){
        return res.json("error in finding book");
      }
      booksNeed.push(book);
    }
    // const favouriteBooks = userData.favourites;
    return res.json({
      status: "Success",
      data: booksNeed,
    });
  } catch (error) {
    console.log("here");
    return res.status(500).json({ message: "An error occurred" });
  }
}); 

module.exports = router;
