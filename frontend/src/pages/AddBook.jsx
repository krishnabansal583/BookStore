import React, { useState } from "react";
import { BookOpen, Upload, Image, DollarSign, User, Tag, FileText, Link2, Check, X } from "lucide-react";

const AddBook = () => {
  const [data, setData] = useState({
    imageURL: "",
    bookTitle: "",
    authorName: "",
    price: "",
    bookDescription: "",
    category: "",
    bookPDFURL: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Science Fiction",
    "Fantasy",
    "Biography",
    "History",
    "Self-Help",
    "Business",
    "Technology",
    "Education",
    "Children",
    "Young Adult"
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.imageURL.trim()) newErrors.imageURL = "Image URL is required";
    if (!data.bookTitle.trim()) newErrors.bookTitle = "Book title is required";
    if (!data.authorName.trim()) newErrors.authorName = "Author name is required";
    if (!data.price) newErrors.price = "Price is required";
    if (!data.bookDescription.trim()) newErrors.bookDescription = "Description is required";
    if (!data.category) newErrors.category = "Category is required";
    if (!data.bookPDFURL.trim()) newErrors.bookPDFURL = "PDF URL is required";
    
    if (data.price && (isNaN(data.price) || parseFloat(data.price) <= 0)) {
      newErrors.price = "Please enter a valid price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        price: parseFloat(data.price).toFixed(2)
      };
      
      const response = await fetch("http://localhost:1000/api/v1/add-book", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(formattedData)
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(result.message || "Book added successfully!");
        setData({
          imageURL: "",
          bookTitle: "",
          authorName: "",
          price: "",
          bookDescription: "",
          category: "",
          bookPDFURL: "",
        });
        setErrors({});
      } else {
        alert(result.message || "Failed to add book");
      }
    } catch (error) {
      alert(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setData({
      imageURL: "",
      bookTitle: "",
      authorName: "",
      price: "",
      bookDescription: "",
      category: "",
      bookPDFURL: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-indigo-600 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Add New Book
              </h1>
              <p className="text-gray-600 mt-1">Fill in the details to add a new book to the catalog</p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Book Information
            </h2>
          </div>

          <div className="p-6 md:p-8">
            {/* Image Preview Section */}
            {data.imageURL && (
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <img
                    src={data.imageURL}
                    alt="Book preview"
                    className="h-48 w-32 object-cover rounded-lg shadow-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/128x192?text=Invalid+URL";
                    }}
                  />
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {/* Form Grid */}
            <div className="space-y-6">
              {/* Row 1: Image URL & Book Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <Image className="w-5 h-5 text-indigo-600" />
                    Image URL *
                  </label>
                  <input
                    type="text"
                    className={`p-3 border-2 rounded-lg outline-none transition-all ${
                      errors.imageURL 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-indigo-500"
                    }`}
                    placeholder="https://example.com/book-cover.jpg"
                    name="imageURL"
                    value={data.imageURL}
                    onChange={handleChange}
                  />
                  {errors.imageURL && (
                    <p className="text-red-500 text-sm mt-1">{errors.imageURL}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                    Book Title *
                  </label>
                  <input
                    type="text"
                    className={`p-3 border-2 rounded-lg outline-none transition-all ${
                      errors.bookTitle 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-indigo-500"
                    }`}
                    placeholder="Enter book title"
                    name="bookTitle"
                    value={data.bookTitle}
                    onChange={handleChange}
                  />
                  {errors.bookTitle && (
                    <p className="text-red-500 text-sm mt-1">{errors.bookTitle}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Author & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <User className="w-5 h-5 text-indigo-600" />
                    Author Name *
                  </label>
                  <input
                    type="text"
                    className={`p-3 border-2 rounded-lg outline-none transition-all ${
                      errors.authorName 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-indigo-500"
                    }`}
                    placeholder="Enter author name"
                    name="authorName"
                    value={data.authorName}
                    onChange={handleChange}
                  />
                  {errors.authorName && (
                    <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <Tag className="w-5 h-5 text-indigo-600" />
                    Category *
                  </label>
                  <select
                    className={`p-3 border-2 rounded-lg outline-none transition-all cursor-pointer ${
                      errors.category 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-indigo-500"
                    }`}
                    name="category"
                    value={data.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Price & PDF URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <DollarSign className="w-5 h-5 text-indigo-600" />
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className={`p-3 border-2 rounded-lg outline-none transition-all ${
                      errors.price 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-indigo-500"
                    }`}
                    placeholder="0.00"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                    <Link2 className="w-5 h-5 text-indigo-600" />
                    Book PDF URL *
                  </label>
                  <input
                    type="text"
                    className={`p-3 border-2 rounded-lg outline-none transition-all ${
                      errors.bookPDFURL 
                        ? "border-red-300 focus:border-red-500" 
                        : "border-gray-200 focus:border-indigo-500"
                    }`}
                    placeholder="https://example.com/book.pdf"
                    name="bookPDFURL"
                    value={data.bookPDFURL}
                    onChange={handleChange}
                  />
                  {errors.bookPDFURL && (
                    <p className="text-red-500 text-sm mt-1">{errors.bookPDFURL}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  Description *
                </label>
                <textarea
                  className={`p-3 border-2 rounded-lg outline-none transition-all resize-none ${
                    errors.bookDescription 
                      ? "border-red-300 focus:border-red-500" 
                      : "border-gray-200 focus:border-indigo-500"
                  }`}
                  rows="5"
                  placeholder="Enter a detailed description of the book..."
                  name="bookDescription"
                  value={data.bookDescription}
                  onChange={handleChange}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.bookDescription ? (
                    <p className="text-red-500 text-sm">{errors.bookDescription}</p>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      {data.bookDescription.length} characters
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5" />
                  Reset Form
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Adding Book...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Add Book to Catalog
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Tips:</strong> Make sure all URLs are publicly accessible. The image should be a clear book cover, 
            and the PDF should be the complete book file. All fields marked with * are required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddBook;