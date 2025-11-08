// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useParams, useNavigate } from "react-router-dom";

// // const UpdateBook = () => {
// //   const [data, setData] = useState({
// //     imageURL: "",
// //     bookTitle: "",
// //     authorName: "",
// //     price: "",
// //     bookDescription: "",
// //     category: "",
// //     bookPDFURL: "",
// //   });

  
// //   const { id } = useParams();
// //   const navigate = useNavigate()
// //   const headers = {
// //     id: localStorage.getItem("id"),
// //     authorization: `Bearer ${localStorage.getItem("token")}`,
// //     bookid:id,
// //   };
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setData({ ...data, [name]: value });
// //   };

// //   const handleSubmit = async () => {
// //     try {
// //       if (
// //         data.imageURL === "" ||
// //         data.bookTitle === "" ||
// //         data.authorName === "" ||
// //         data.price === "" ||
// //         data.bookDescription === "" ||
// //         data.category === "" ||
// //         data.bookPDFURL === ""
// //       ) {
// //         alert("All fields are required");
// //       } else {
// //         const formattedData = {
// //           ...data,
// //           price: data.price,
// //         };
// //         const response = await axios.put(
// //           "http://localhost:1000/api/v1/update-book",
// //           formattedData,
// //           { headers }
// //         );
// //         setData({
// //           imageURL: "",
// //           bookTitle: "",
// //           authorName: "",
// //           price: "",
// //           bookDescription: "",
// //           category: "",
// //           bookPDFURL: "",
// //         });
// //         alert(response.data.message);
// //         navigate(`/view-book-details/${id}`)
// //       }
// //     } catch (error) {
// //       alert(error.response?.data?.message || "An error occurred");
// //     }
// //   };
// //   useEffect(() => {
// //     const fetch = async () => {
// //       try {
// //         const response = await axios.get(
// //           `http://localhost:1000/api/v1/get-book-by-id/${id}`
// //         );
// //         setData(response.data.data);
// //       } catch (error) {
// //         console.error("Error fetching profile data:", error);
// //       }
// //     };
// //     fetch();
// //   }, []);
// //   return (
// //     <div className="h-full p-4 bg-purple-800 bg-opacity-20 rounded shadow-md font-roboto">
// //       <h1 className="text-4xl font-semibold text-gray-800 mb-8">Update Book</h1>
// //       <div className="flex gap-8">
// //         <div className="flex flex-col w-1/2">
// //           <label
// //             htmlFor="imageURL"
// //             className="font-semibold text-gray-700 text-xl"
// //           >
// //             Image URL
// //           </label>
// //           <input
// //             type="text"
// //             className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
// //             placeholder="URL of image"
// //             name="imageURL"
// //             required
// //             value={data.imageURL}
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div className="flex flex-col w-1/2">
// //           <label
// //             htmlFor="bookTitle"
// //             className="font-semibold text-gray-700 text-xl"
// //           >
// //             Book Title
// //           </label>
// //           <input
// //             type="text"
// //             className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
// //             placeholder="Title of book"
// //             name="bookTitle"
// //             required
// //             value={data.bookTitle}
// //             onChange={handleChange}
// //           />
// //         </div>
// //       </div>
// //       <div className="flex gap-8 mt-8">
// //         <div className="flex flex-col w-1/2">
// //           <label
// //             htmlFor="authorName"
// //             className="font-semibold text-gray-700 text-xl"
// //           >
// //             Author Name
// //           </label>
// //           <input
// //             type="text"
// //             className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
// //             placeholder="Author of book"
// //             name="authorName"
// //             required
// //             value={data.authorName}
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div className="flex flex-col w-1/2">
// //           <label
// //             htmlFor="category"
// //             className="font-semibold text-gray-700 text-xl"
// //           >
// //             Category
// //           </label>
// //           <input
// //             type="text"
// //             className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
// //             placeholder="Category of book"
// //             name="category"
// //             required
// //             value={data.category}
// //             onChange={handleChange}
// //           />
// //         </div>
// //       </div>
// //       <div className="flex gap-8 mt-8">
// //         <div className="flex flex-col w-1/2">
// //           <label
// //             htmlFor="price"
// //             className="font-semibold text-gray-700 text-xl"
// //           >
// //             Price ($)
// //           </label>
// //           <input
// //             type="text"
// //             className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
// //             placeholder="Price of book"
// //             name="price"
// //             required
// //             value={data.price}
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div className="flex flex-col w-1/2">
// //           <label
// //             htmlFor="bookPDFURL"
// //             className="font-semibold text-gray-700 text-xl"
// //           >
// //             Book PDF URL
// //           </label>
// //           <input
// //             type="text"
// //             className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
// //             placeholder="URL of book PDF"
// //             name="bookPDFURL"
// //             required
// //             value={data.bookPDFURL}
// //             onChange={handleChange}
// //           />
// //         </div>
// //       </div>
// //       <div className="flex flex-col mt-8">
// //         <label
// //           htmlFor="bookDescription"
// //           className="font-semibold text-gray-700 text-xl"
// //         >
// //           Description
// //         </label>
// //         <textarea
// //           className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
// //           rows="5"
// //           placeholder="Description of book"
// //           name="bookDescription"
// //           required
// //           value={data.bookDescription}
// //           onChange={handleChange}
// //         />
// //       </div>
// //       <div className="mt-8 flex justify-end">
// //         <button
// //           className="bg-yellow-500 bg-opacity-80 border border-zinc-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600"
// //           onClick={handleSubmit}
// //         >
// //           Update Book
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UpdateBook;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { BookOpen, Edit3, Image, User, Tag, DollarSign, Link2, FileText, Check, ArrowLeft, Loader } from "lucide-react";

// const UpdateBook = () => {
//   const [data, setData] = useState({
//     imageURL: "",
//     bookTitle: "",
//     authorName: "",
//     price: "",
//     bookDescription: "",
//     category: "",
//     bookPDFURL: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errors, setErrors] = useState({});

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//     bookid: id,
//   };

//   const categories = [
//     "Fiction",
//     "Non-Fiction",
//     "Mystery",
//     "Thriller",
//     "Romance",
//     "Science Fiction",
//     "Fantasy",
//     "Biography",
//     "History",
//     "Self-Help",
//     "Business",
//     "Technology",
//     "Education",
//     "Children",
//     "Young Adult"
//   ];

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!data.imageURL.trim()) newErrors.imageURL = "Image URL is required";
//     if (!data.bookTitle.trim()) newErrors.bookTitle = "Book title is required";
//     if (!data.authorName.trim()) newErrors.authorName = "Author name is required";
//     if (!data.price) newErrors.price = "Price is required";
//     if (!data.bookDescription.trim()) newErrors.bookDescription = "Description is required";
//     if (!data.category) newErrors.category = "Category is required";
//     if (!data.bookPDFURL.trim()) newErrors.bookPDFURL = "PDF URL is required";
    
//     if (data.price && (isNaN(data.price) || parseFloat(data.price) <= 0)) {
//       newErrors.price = "Please enter a valid price";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const formattedData = {
//         ...data,
//         price: parseFloat(data.price).toFixed(2)
//       };
      
//       const response = await axios.put(
//         "http://localhost:1000/api/v1/update-book",
//         formattedData,
//         { headers }
//       );
      
//       alert(response.data.message || "Book updated successfully!");
//       navigate(`/view-book-details/${id}`);
//     } catch (error) {
//       alert(error.response?.data?.message || "An error occurred");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     const fetchBookData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(
//           `http://localhost:1000/api/v1/get-book-by-id/${id}`
//         );
//         setData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching book data:", error);
//         alert("Failed to load book data");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchBookData();
//   }, [id]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
//         <div className="text-center">
//           <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
//           <p className="text-gray-600 text-lg">Loading book details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(`/view-book-details/${id}`)}
//             className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-4"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             Back to Book Details
//           </button>
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-3 bg-indigo-600 rounded-xl">
//               <Edit3 className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//                 Update Book
//               </h1>
//               <p className="text-gray-600 mt-1">Modify the book details below</p>
//             </div>
//           </div>
//         </div>

//         {/* Main Form Card */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//           {/* Form Header */}
//           <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
//             <h2 className="text-xl font-semibold text-white flex items-center gap-2">
//               <BookOpen className="w-5 h-5" />
//               Book Information
//             </h2>
//           </div>

//           <div className="p-6 md:p-8">
//             {/* Image Preview Section */}
//             {data.imageURL && (
//               <div className="mb-8 flex justify-center">
//                 <div className="relative">
//                   <img
//                     src={data.imageURL}
//                     alt="Book preview"
//                     className="h-48 w-32 object-cover rounded-lg shadow-lg"
//                     onError={(e) => {
//                       e.target.src = "https://via.placeholder.com/128x192?text=Invalid+URL";
//                     }}
//                   />
//                   <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full">
//                     <Edit3 className="w-4 h-4" />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Form Grid */}
//             <div className="space-y-6">
//               {/* Row 1: Image URL & Book Title */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex flex-col">
//                   <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
//                     <Image className="w-5 h-5 text-indigo-600" />
//                     Image URL *
//                   </label>
//                   <input
//                     type="text"
//                     className={`p-3 border-2 rounded-lg outline-none transition-all ${
//                       errors.imageURL 
//                         ? "border-red-300 focus:border-red-500" 
//                         : "border-gray-200 focus:border-indigo-500"
//                     }`}
//                     placeholder="https://example.com/book-cover.jpg"
//                     name="imageURL"
//                     value={data.imageURL}
//                     onChange={handleChange}
//                   />
//                   {errors.imageURL && (
//                     <p className="text-red-500 text-sm mt-1">{errors.imageURL}</p>
//                   )}
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
//                     <BookOpen className="w-5 h-5 text-indigo-600" />
//                     Book Title *
//                   </label>
//                   <input
//                     type="text"
//                     className={`p-3 border-2 rounded-lg outline-none transition-all ${
//                       errors.bookTitle 
//                         ? "border-red-300 focus:border-red-500" 
//                         : "border-gray-200 focus:border-indigo-500"
//                     }`}
//                     placeholder="Enter book title"
//                     name="bookTitle"
//                     value={data.bookTitle}
//                     onChange={handleChange}
//                   />
//                   {errors.bookTitle && (
//                     <p className="text-red-500 text-sm mt-1">{errors.bookTitle}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Row 2: Author & Category */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex flex-col">
//                   <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
//                     <User className="w-5 h-5 text-indigo-600" />
//                     Author Name *
//                   </label>
//                   <input
//                     type="text"
//                     className={`p-3 border-2 rounded-lg outline-none transition-all ${
//                       errors.authorName 
//                         ? "border-red-300 focus:border-red-500" 
//                         : "border-gray-200 focus:border-indigo-500"
//                     }`}
//                     placeholder="Enter author name"
//                     name="authorName"
//                     value={data.authorName}
//                     onChange={handleChange}
//                   />
//                   {errors.authorName && (
//                     <p className="text-red-500 text-sm mt-1">{errors.authorName}</p>
//                   )}
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
//                     <Tag className="w-5 h-5 text-indigo-600" />
//                     Category *
//                   </label>
//                   <select
//                     className={`p-3 border-2 rounded-lg outline-none transition-all cursor-pointer ${
//                       errors.category 
//                         ? "border-red-300 focus:border-red-500" 
//                         : "border-gray-200 focus:border-indigo-500"
//                     }`}
//                     name="category"
//                     value={data.category}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select a category</option>
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat}>
//                         {cat}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.category && (
//                     <p className="text-red-500 text-sm mt-1">{errors.category}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Row 3: Price & PDF URL */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex flex-col">
//                   <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
//                     <DollarSign className="w-5 h-5 text-indigo-600" />
//                     Price ($) *
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     className={`p-3 border-2 rounded-lg outline-none transition-all ${
//                       errors.price 
//                         ? "border-red-300 focus:border-red-500" 
//                         : "border-gray-200 focus:border-indigo-500"
//                     }`}
//                     placeholder="0.00"
//                     name="price"
//                     value={data.price}
//                     onChange={handleChange}
//                   />
//                   {errors.price && (
//                     <p className="text-red-500 text-sm mt-1">{errors.price}</p>
//                   )}
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
//                     <Link2 className="w-5 h-5 text-indigo-600" />
//                     Book PDF URL *
//                   </label>
//                   <input
//                     type="text"
//                     className={`p-3 border-2 rounded-lg outline-none transition-all ${
//                       errors.bookPDFURL 
//                         ? "border-red-300 focus:border-red-500" 
//                         : "border-gray-200 focus:border-indigo-500"
//                     }`}
//                     placeholder="https://example.com/book.pdf"
//                     name="bookPDFURL"
//                     value={data.bookPDFURL}
//                     onChange={handleChange}
//                   />
//                   {errors.bookPDFURL && (
//                     <p className="text-red-500 text-sm mt-1">{errors.bookPDFURL}</p>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <div className="flex flex-col">
//                 <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
//                   <FileText className="w-5 h-5 text-indigo-600" />
//                   Description *
//                 </label>
//                 <textarea
//                   className={`p-3 border-2 rounded-lg outline-none transition-all resize-none ${
//                     errors.bookDescription 
//                       ? "border-red-300 focus:border-red-500" 
//                       : "border-gray-200 focus:border-indigo-500"
//                   }`}
//                   rows="5"
//                   placeholder="Enter a detailed description of the book..."
//                   name="bookDescription"
//                   value={data.bookDescription}
//                   onChange={handleChange}
//                 />
//                 <div className="flex justify-between items-center mt-1">
//                   {errors.bookDescription ? (
//                     <p className="text-red-500 text-sm">{errors.bookDescription}</p>
//                   ) : (
//                     <p className="text-gray-500 text-sm">
//                       {data.bookDescription.length} characters
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
//                 <button
//                   onClick={() => navigate(`/view-book-details/${id}`)}
//                   className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
//                   disabled={isSubmitting}
//                 >
//                   <ArrowLeft className="w-5 h-5" />
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubmitting}
//                   className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       Updating Book...
//                     </>
//                   ) : (
//                     <>
//                       <Check className="w-5 h-5" />
//                       Update Book
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Help Text */}
//         <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
//           <p className="text-sm text-amber-800">
//             <strong>Note:</strong> You are editing an existing book. Make sure all changes are accurate before updating. 
//             All fields marked with * are required.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateBook;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, Edit3, Image, User, Tag, DollarSign, Link2, FileText, Check, ArrowLeft, Loader } from "lucide-react";

const UpdateBook = () => {
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
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
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
      
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-book",
        formattedData,
        { headers }
      );
      
      alert(response.data.message || "Book updated successfully!");
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
        alert("Failed to load book data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/view-book-details/${id}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Book Details
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-indigo-600 rounded-xl">
              <Edit3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Update Book
              </h1>
              <p className="text-gray-600 mt-1">Modify the book details below</p>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
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
                  <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full">
                    <Edit3 className="w-4 h-4" />
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
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className={`p-3 pl-8 border-2 rounded-lg outline-none transition-all w-full ${
                        errors.price 
                          ? "border-red-300 focus:border-red-500" 
                          : "border-gray-200 focus:border-indigo-500"
                      }`}
                      placeholder="0.00"
                      name="price"
                      value={typeof data.price === 'string' ? data.price.replace(/[^0-9.]/g, '') : data.price}
                      onChange={handleChange}
                    />
                  </div>
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
                  onClick={() => navigate(`/view-book-details/${id}`)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Updating Book...
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      Update Book
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> You are editing an existing book. Make sure all changes are accurate before updating. 
            All fields marked with * are required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;