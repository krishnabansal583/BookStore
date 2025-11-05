// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import Loader from "../Loader/Loader";
// // // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // // import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
// // // // import { MdOutlineDelete } from "react-icons/md";
// // // // import { useSelector } from "react-redux";

// // // // const ViewBookDetails = () => {
// // // //   const navigate = useNavigate();
// // // //   const { id } = useParams();
// // // //   const [data, setData] = useState(null);
// // // //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
// // // //   const role = useSelector((state) => state.auth.role);

// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const response = await axios.get(
// // // //           `http://localhost:1000/api/v1/get-book-by-id/${id}`
// // // //         );
// // // //         setData(response.data.data);
// // // //       } catch (error) {
// // // //         console.error("Error fetching book details:", error);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [id]);

// // // //   if (!data) {
// // // //     return (
// // // //       <div className="h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#fab9c4]">
// // // //         <Loader />
// // // //       </div>
// // // //     );
// // // //   }
// // // //   const headers = {
// // // //     id: localStorage.getItem("id"),
// // // //     authorization: `Bearer ${localStorage.getItem("token")}`,
// // // //     bookid: id,
// // // //   };
// // // //   const handleFavourite = async () => {
// // // //     const response = await axios.put(
// // // //       "http://localhost:1000/api/v1/add-book-to-favourite",
// // // //       {},
// // // //       { headers }
// // // //     );
// // // //     alert(response.data.message);
// // // //   };
// // // //   const handleCart = async () => {
// // // //     const response = await axios.put(
// // // //       "http://localhost:1000/api/v1/add-to-cart",
// // // //       {},
// // // //       { headers }
// // // //     );
// // // //     alert(response.data.message);
// // // //   };
// // // //   const deleteBook = async () => {
// // // //     const response = await axios.delete(
// // // //       "http://localhost:1000/api/v1/delete-book",

// // // //       { headers }
// // // //     );
// // // //     alert(response.data.message);
// // // //     navigate("/all-books");
// // // //   };
// // // //   return (
// // // //     <div className="md:h-screen lg:h-screen flex flex-col bg-gradient-to-b from-white to-[#fab9c4]">
// // // //       <div className="flex-grow px-4 py-8 flex flex-col md:flex-row gap-8 md:px-12">
// // // //         <div className="flex flex-col md:flex-row gap-8 w-full h-auto">
// // // //           <div className="relative w-full sm:w-[50%] md:w-[35%]">
// // // //             <div className="bg-[#6851CD] rounded-2xl mt-5 p-4 h-[30vh] md:h-[60vh] flex items-center justify-center relative">
// // // //               {data.imageURL && (
// // // //                 <img
// // // //                   src={data.imageURL}
// // // //                   alt="Book Cover"
// // // //                   className="h-full md:h-[60vh] rounded"
// // // //                 />
// // // //               )}

// // // //               {isLoggedIn === true && role === "user" && (
// // // //                 <div className="absolute top-0 right-[-8px] mr-5 mt-4 flex flex-col items-center justify-center">
// // // //                   <button
// // // //                     className="bg-white rounded-full text-2xl p-2 text-red-500 hover:text-red-600"
// // // //                     onClick={handleFavourite}
// // // //                   >
// // // //                     <FaHeart />
// // // //                   </button>
// // // //                   <button
// // // //                     className="bg-white rounded-full text-2xl p-2 mt-5 text-blue-600 hover:text-blue-700"
// // // //                     onClick={handleCart}
// // // //                   >
// // // //                     <FaShoppingCart />
// // // //                   </button>
// // // //                 </div>
// // // //               )}
// // // //               {isLoggedIn === true && role === "admin" && (
// // // //                 <div className="absolute top-0 right-[-8px] mr-5 mt-4 flex flex-col items-center justify-center">
// // // //                   <Link
// // // //                     to={`/UpdateBook/${id}`}
// // // //                     className="bg-white rounded-full text-2xl p-2 "
// // // //                   >
// // // //                     <FaEdit />
// // // //                   </Link>
// // // //                   <button
// // // //                     className="bg-white rounded-full text-2xl p-2 mt-5 text-red-500"
// // // //                     onClick={deleteBook}
// // // //                   >
// // // //                     <MdOutlineDelete />
// // // //                   </button>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //           <div className="p-4 w-full md:w-[75%]">
// // // //             <h1 className="text-3xl lg:text-4xl text-zinc-700 font-semibold mb-2">
// // // //               {data.bookTitle}
// // // //             </h1>
// // // //             <p className="text-gray-600 font-medium mb-2">
// // // //               By ~ {data.authorName}
// // // //             </p>
// // // //             <p className="text-zinc-500 mt-4 text-base lg:font-semibold md:text-xl md:font-normal cursive-font">
// // // //               {data.bookDescription}
// // // //             </p>
// // // //             <p className="text-zinc-700 mb-1 mt-4 text-xl font-semibold">
// // // //               Category: {data.category}
// // // //             </p>
// // // //             <p className="text-zinc-900 text-2xl font-semibold">
// // // //               Price: {data.price}
// // // //             </p>
// // // //             {data.bookPDFURL && (
// // // //               <p className="mt-4">
// // // //                 <a
// // // //                   href={data.bookPDFURL}
// // // //                   target="_blank"
// // // //                   rel="noopener noreferrer"
// // // //                   className="text-blue-600 font-semibold hover:no-underline text-lg block"
// // // //                 >
// // // //                   Read More
// // // //                 </a>
// // // //               </p>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ViewBookDetails;

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import Loader from "../Loader/Loader";
// // // import { Link, useNavigate, useParams } from "react-router-dom";
// // // import { FaEdit, FaHeart, FaShoppingCart, FaBook, FaTag, FaArrowLeft } from "react-icons/fa";
// // // import { MdOutlineDelete } from "react-icons/md";
// // // import { useSelector } from "react-redux";

// // // const ViewBookDetails = () => {
// // //   const navigate = useNavigate();
// // //   const { id } = useParams();
// // //   const [data, setData] = useState(null);
// // //   const [isFavourite, setIsFavourite] = useState(false);
// // //   const [isInCart, setIsInCart] = useState(false);
// // //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
// // //   const role = useSelector((state) => state.auth.role);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const response = await axios.get(
// // //           `http://localhost:1000/api/v1/get-book-by-id/${id}`
// // //         );
// // //         setData(response.data.data);
// // //       } catch (error) {
// // //         console.error("Error fetching book details:", error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [id]);

// // //   if (!data) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FDCFFA] to-white">
// // //         <Loader />
// // //       </div>
// // //     );
// // //   }

// // //   const headers = {
// // //     id: localStorage.getItem("id"),
// // //     authorization: `Bearer ${localStorage.getItem("token")}`,
// // //     bookid: id,
// // //   };

// // //   const handleFavourite = async () => {
// // //     try {
// // //       const response = await axios.put(
// // //         "http://localhost:1000/api/v1/add-book-to-favourite",
// // //         {},
// // //         { headers }
// // //       );
// // //       setIsFavourite(!isFavourite);
// // //       alert(response.data.message);
// // //     } catch (error) {
// // //       console.error("Error adding to favourites:", error);
// // //     }
// // //   };

// // //   const handleCart = async () => {
// // //     try {
// // //       const response = await axios.put(
// // //         "http://localhost:1000/api/v1/add-to-cart",
// // //         {},
// // //         { headers }
// // //       );
// // //       setIsInCart(!isInCart);
// // //       alert(response.data.message);
// // //     } catch (error) {
// // //       console.error("Error adding to cart:", error);
// // //     }
// // //   };

// // //   const deleteBook = async () => {
// // //     if (window.confirm("Are you sure you want to delete this book?")) {
// // //       try {
// // //         const response = await axios.delete(
// // //           "http://localhost:1000/api/v1/delete-book",
// // //           { headers }
// // //         );
// // //         alert(response.data.message);
// // //         navigate("/all-books");
// // //       } catch (error) {
// // //         console.error("Error deleting book:", error);
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-b from-[#FDCFFA] to-white py-8 px-4">
// // //       <div className="max-w-7xl mx-auto">
// // //         {/* Back Button */}
// // //         <button
// // //           onClick={() => navigate(-1)}
// // //           className="flex items-center gap-2 text-[#4E56C0] hover:text-[#9B5DE0] font-semibold mb-6 transition-colors"
// // //         >
// // //           <FaArrowLeft />
// // //           <span>Back</span>
// // //         </button>

// // //         {/* Main Content Card */}
// // //         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
// // //           <div className="flex flex-col lg:flex-row">
// // //             {/* Left Side - Book Image */}
// // //             <div className="lg:w-2/5 bg-gradient-to-br from-[#4E56C0] to-[#9B5DE0] p-8 lg:p-12 flex items-center justify-center relative">
// // //               {/* Decorative Elements */}
// // //               <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-20 -mt-20"></div>
// // //               <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mb-16"></div>

// // //               {/* Book Image */}
// // //               <div className="relative z-10 max-w-sm w-full">
// // //                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
// // //                   {data.imageURL && (
// // //                     <img
// // //                       src={data.imageURL}
// // //                       alt={data.bookTitle}
// // //                       className="w-full h-auto rounded-lg shadow-lg object-contain max-h-[500px]"
// // //                     />
// // //                   )}
// // //                 </div>

// // //                 {/* Action Buttons for User */}
// // //                 {isLoggedIn && role === "user" && (
// // //                   <div className="flex gap-3 mt-6 justify-center">
// // //                     <button
// // //                       onClick={handleFavourite}
// // //                       className={`flex-1 flex items-center justify-center gap-2 ${
// // //                         isFavourite
// // //                           ? "bg-gradient-to-r from-[#D78FEE] to-[#FDCFFA]"
// // //                           : "bg-white"
// // //                       } rounded-xl py-3 px-4 font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105`}
// // //                     >
// // //                       <FaHeart className={isFavourite ? "text-white" : "text-[#D78FEE]"} />
// // //                       <span className={isFavourite ? "text-white" : "text-[#4E56C0]"}>
// // //                         {isFavourite ? "Saved" : "Favourite"}
// // //                       </span>
// // //                     </button>
// // //                     <button
// // //                       onClick={handleCart}
// // //                       className={`flex-1 flex items-center justify-center gap-2 ${
// // //                         isInCart
// // //                           ? "bg-gradient-to-r from-[#9B5DE0] to-[#4E56C0]"
// // //                           : "bg-white"
// // //                       } rounded-xl py-3 px-4 font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105`}
// // //                     >
// // //                       <FaShoppingCart className={isInCart ? "text-white" : "text-[#4E56C0]"} />
// // //                       <span className={isInCart ? "text-white" : "text-[#4E56C0]"}>
// // //                         {isInCart ? "In Cart" : "Add to Cart"}
// // //                       </span>
// // //                     </button>
// // //                   </div>
// // //                 )}

// // //                 {/* Action Buttons for Admin */}
// // //                 {isLoggedIn && role === "admin" && (
// // //                   <div className="flex gap-3 mt-6 justify-center">
// // //                     <Link
// // //                       to={`/UpdateBook/${id}`}
// // //                       className="flex-1 flex items-center justify-center gap-2 bg-white rounded-xl py-3 px-4 font-semibold text-[#4E56C0] transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
// // //                     >
// // //                       <FaEdit />
// // //                       <span>Edit</span>
// // //                     </Link>
// // //                     <button
// // //                       onClick={deleteBook}
// // //                       className="flex-1 flex items-center justify-center gap-2 bg-white rounded-xl py-3 px-4 font-semibold text-red-500 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
// // //                     >
// // //                       <MdOutlineDelete />
// // //                       <span>Delete</span>
// // //                     </button>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Right Side - Book Details */}
// // //             <div className="lg:w-3/5 p-8 lg:p-12">
// // //               {/* Book Title */}
// // //               <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
// // //                 {data.bookTitle}
// // //               </h1>

// // //               {/* Author */}
// // //               <p className="text-lg text-gray-600 font-medium mb-6">
// // //                 by <span className="text-[#9B5DE0] font-semibold">{data.authorName}</span>
// // //               </p>

// // //               {/* Price & Category Tags */}
// // //               <div className="flex flex-wrap gap-3 mb-6">
// // //                 <div className="bg-gradient-to-r from-[#4E56C0] to-[#9B5DE0] text-white px-6 py-3 rounded-full font-bold text-xl shadow-md">
// // //                   {data.price}
// // //                 </div>
// // //                 <div className="bg-gradient-to-r from-[#D78FEE] to-[#FDCFFA] text-[#4E56C0] px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-md">
// // //                   <FaTag />
// // //                   {data.category}
// // //                 </div>
// // //               </div>

// // //               {/* Divider */}
// // //               <hr className="border-gray-200 mb-6" />

// // //               {/* Description Section */}
// // //               <div className="mb-8">
// // //                 <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
// // //                   <FaBook className="text-[#9B5DE0]" />
// // //                   About This Book
// // //                 </h2>
// // //                 <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
// // //                   {data.bookDescription}
// // //                 </p>
// // //               </div>

// // //               {/* Read More Link */}
// // //               {data.bookPDFURL && (
// // //                 <div className="mt-8">
// // //                   <a
// // //                     href={data.bookPDFURL}
// // //                     target="_blank"
// // //                     rel="noopener noreferrer"
// // //                     className="inline-flex items-center gap-3 bg-gradient-to-r from-[#9B5DE0] to-[#D78FEE] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
// // //                   >
// // //                     <FaBook />
// // //                     <span>Read Sample</span>
// // //                   </a>
// // //                 </div>
// // //               )}

// // //               {/* Additional Info Cards */}
// // //               <div className="grid grid-cols-2 gap-4 mt-8">
// // //                 <div className="bg-gradient-to-br from-[#FDCFFA] to-white p-4 rounded-xl border border-[#D78FEE]/30">
// // //                   <p className="text-sm text-gray-600 font-medium mb-1">Category</p>
// // //                   <p className="text-lg font-bold text-[#4E56C0]">{data.category}</p>
// // //                 </div>
// // //                 <div className="bg-gradient-to-br from-[#FDCFFA] to-white p-4 rounded-xl border border-[#D78FEE]/30">
// // //                   <p className="text-sm text-gray-600 font-medium mb-1">Price</p>
// // //                   <p className="text-lg font-bold text-[#4E56C0]">{data.price}</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ViewBookDetails;

// // // pages/ViewBookDetails.jsx
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import Loader from "../Loader/Loader";
// // import { Link, useNavigate, useParams } from "react-router-dom";
// // import {
// //   FaEdit,
// //   FaHeart,
// //   FaShoppingCart,
// //   FaArrowLeft,
// //   FaTag,
// //   FaBook,
// // } from "react-icons/fa";
// // import { MdOutlineDelete } from "react-icons/md";
// // import { useSelector } from "react-redux";

// // const ViewBookDetails = () => {
// //   const navigate = useNavigate();
// //   const { id } = useParams();
// //   const [data, setData] = useState(null);
// //   const [isFavourite, setIsFavourite] = useState(false);
// //   const [isInCart, setIsInCart] = useState(false);

// //   const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
// //   const role = useSelector((s) => s.auth.role);

// //   /* ------------------------------------------------------------------ */
// //   /*  FETCH BOOK                                                       */
// //   /* ------------------------------------------------------------------ */
// //   useEffect(() => {
// //     const fetch = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://localhost:1000/api/v1/get-book-by-id/${id}`
// //         );
// //         setData(res.data.data);
// //       } catch (e) {
// //         console.error(e);
// //       }
// //     };
// //     fetch();
// //   }, [id]);

// //   const headers = {
// //     id: localStorage.getItem("id"),
// //     authorization: `Bearer ${localStorage.getItem("token")}`,
// //     bookid: id,
// //   };

// //   /* ------------------------------------------------------------------ */
// //   /*  ACTIONS                                                          */
// //   /* ------------------------------------------------------------------ */
// //   const toggleFavourite = async () => {
// //     try {
// //       const res = await axios.put(
// //         "http://localhost:1000/api/v1/add-book-to-favourite",
// //         {},
// //         { headers }
// //       );
// //       setIsFavourite((v) => !v);
// //       alert(res.data.message);
// //     } catch {
// //       alert("Failed to update favourite");
// //     }
// //   };

// //   const toggleCart = async () => {
// //     try {
// //       const res = await axios.put(
// //         "http://localhost:1000/api/v1/add-to-cart",
// //         {},
// //         { headers }
// //       );
// //       setIsInCart((v) => !v);
// //       alert(res.data.message);
// //     } catch {
// //       alert("Failed to add to cart");
// //     }
// //   };

// //   const deleteBook = async () => {
// //     if (!window.confirm("Delete this book permanently?")) return;
// //     try {
// //       const res = await axios.delete(
// //         "http://localhost:1000/api/v1/delete-book",
// //         { headers }
// //       );
// //       alert(res.data.message);
// //       navigate("/all-books");
// //     } catch {
// //       alert("Delete failed");
// //     }
// //   };

// //   /* ------------------------------------------------------------------ */
// //   /*  LOADER                                                            */
// //   /* ------------------------------------------------------------------ */
// //   if (!data) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FDCFFA] to-white">
// //         <Loader />
// //       </div>
// //     );
// //   }

// //   /* ------------------------------------------------------------------ */
// //   /*  RENDER                                                            */
// //   /* ------------------------------------------------------------------ */
// //   return (
// //     <div
// //       className="min-h-screen p-6 lg:p-12"
// //       style={{
// //         background: `linear-gradient(to bottom, #FDCFFA 0%, #ffffff 100%)`,
// //       }}
// //     >
// //       <div className="max-w-4xl mx-auto">

// //         {/* ---- Back button ---- */}
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="flex items-center gap-2 text-sm font-medium text-[#4E56C0] hover:text-[#3a4199] mb-6"
// //         >
// //           <FaArrowLeft />
// //           Back to Books
// //         </button>

// //         {/* ---- SINGLE CARD ---- */}
// //         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">

// //           {/* ---- Small centered image ---- */}
// //           <div className="flex justify-center mb-8">
// //             <div className="w-40 h-56 bg-gray-50 rounded-xl border border-gray-200 p-3 shadow-sm">
// //               <img
// //                 src={data.imageURL}
// //                 alt={data.bookTitle}
// //                 className="w-full h-full object-contain rounded-lg"
// //               />
// //             </div>
// //           </div>

// //           {/* ---- Title & Author ---- */}
// //           <div className="text-center mb-8">
// //             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
// //               {data.bookTitle}
// //             </h1>
// //             <p className="mt-2 text-lg text-gray-600">
// //               by <span className="font-semibold text-[#4E56C0]">{data.authorName}</span>
// //             </p>
// //           </div>

// //           {/* ---- Price & Category ---- */}
// //           <div className="flex flex-wrap justify-center gap-4 mb-8">
// //             <div className="bg-[#4E56C0] text-white px-5 py-2 rounded-full font-bold">
// //               {data.price}
// //             </div>
// //             <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-full font-medium">
// //               <FaTag className="text-[#9B5DE0]" />
// //               {data.category}
// //             </div>
// //           </div>

// //           <hr className="border-gray-200 mb-8" />

// //           {/* ---- Description ---- */}
// //           <div className="mb-8">
// //             <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
// //               <FaBook className="text-[#9B5DE0]" />
// //               About This Book
// //             </h2>
// //             <p className="text-gray-700 leading-relaxed">{data.bookDescription}</p>
// //           </div>

// //           {/* ---- Sample PDF (if any) ---- */}
// //           {data.bookPDFURL && (
// //             <div className="mb-8 text-center">
// //               <a
// //                 href={data.bookPDFURL}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="inline-flex items-center gap-2 bg-[#4E56C0] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#3a4199]"
// //               >
// //                 <FaBook />
// //                 Read Sample
// //               </a>
// //             </div>
// //           )}

// //           {/* ---- USER ACTIONS ---- */}
// //           {isLoggedIn && role === "user" && (
// //             <div className="flex gap-4 justify-center mb-6">
// //               <button
// //                 onClick={toggleFavourite}
// //                 className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-colors
// //                   ${isFavourite ? "bg-[#D78FEE] text-white" : "bg-gray-100 text-[#4E56C0]"}`}
// //               >
// //                 <FaHeart />
// //                 {isFavourite ? "Saved" : "Favourite"}
// //               </button>

// //               <button
// //                 onClick={toggleCart}
// //                 className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-colors
// //                   ${isInCart ? "bg-[#4E56C0] text-white" : "bg-gray-100 text-[#4E56C0]"}`}
// //               >
// //                 <FaShoppingCart />
// //                 {isInCart ? "In Cart" : "Add to Cart"}
// //               </button>
// //             </div>
// //           )}

// //           {/* ---- ADMIN ACTIONS ---- */}
// //           {isLoggedIn && role === "admin" && (
// //             <div className="flex gap-4 justify-center">
// //               <Link
// //                 to={`/UpdateBook/${id}`}
// //                 className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-100 text-[#4E56C0] font-medium hover:bg-gray-200"
// //               >
// //                 <FaEdit />
// //                 Edit
// //               </Link>

// //               <button
// //                 onClick={deleteBook}
// //                 className="flex items-center gap-2 px-5 py-2 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200"
// //               >
// //                 <MdOutlineDelete />
// //                 Delete
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewBookDetails;

// // pages/ViewBookDetails.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "../Loader/Loader";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//   FaEdit,
//   FaHeart,
//   FaShoppingCart,
//   FaArrowLeft,
//   FaTag,
//   FaBook,
// } from "react-icons/fa";
// import { MdOutlineDelete } from "react-icons/md";
// import { useSelector } from "react-redux";

// const ViewBookDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [data, setData] = useState(null);
//   const [isFavourite, setIsFavourite] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);

//   const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
//   const role = useSelector((s) => s.auth.role);

//   /* ------------------------------------------------------------------ */
//   /*  FETCH BOOK                                                       */
//   /* ------------------------------------------------------------------ */
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:1000/api/v1/get-book-by-id/${id}`
//         );
//         setData(res.data.data);
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     fetch();
//   }, [id]);

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//     bookid: id,
//   };

//   /* ------------------------------------------------------------------ */
//   /*  ACTIONS                                                          */
//   /* ------------------------------------------------------------------ */
//   const toggleFavourite = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:1000/api/v1/add-book-to-favourite",
//         {},
//         { headers }
//       );
//       setIsFavourite((v) => !v);
//       alert(res.data.message);
//     } catch {
//       alert("Failed to update favourite");
//     }
//   };

//   const toggleCart = async () => {
//     try {
//       const res = await axios.put(
//         "http://localhost:1000/api/v1/add-to-cart",
//         {},
//         { headers }
//       );
//       setIsInCart((v) => !v);
//       alert(res.data.message);
//     } catch {
//       alert("Failed to add to cart");
//     }
//   };

//   const deleteBook = async () => {
//     if (!window.confirm("Delete this book permanently?")) return;
//     try {
//       const res = await axios.delete(
//         "http://localhost:1000/api/v1/delete-book",
//         { headers }
//       );
//       alert(res.data.message);
//       navigate("/all-books");
//     } catch {
//       alert("Delete failed");
//     }
//   };

//   /* ------------------------------------------------------------------ */
//   /*  LOADER                                                            */
//   /* ------------------------------------------------------------------ */
//   if (!data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FDCFFA] to-white">
//         <Loader />
//       </div>
//     );
//   }

//   /* ------------------------------------------------------------------ */
//   /*  RENDER                                                            */
//   /* ------------------------------------------------------------------ */
//   return (
//     <div
//       className="min-h-screen p-6 lg:p-12"
//       style={{
//         background: `linear-gradient(to bottom, #FDCFFA 0%, #ffffff 100%)`,
//       }}
//     >
//       {/* FULL-WIDTH CARD – Covers Entire Screen Width */}
//       <div className="w-full mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10 lg:p-12">

//           {/* === BOOK IMAGE – Small & Centered === */}
//           <div className="flex justify-center mb-10">
//             <div className="w-40 h-56 bg-gray-50 rounded-xl border border-gray-200 p-3 shadow-sm">
//               <img
//                 src={data.imageURL}
//                 alt={data.bookTitle}
//                 className="w-full h-full object-contain rounded-lg"
//               />
//             </div>
//           </div>

//           {/* === TITLE & AUTHOR === */}
//           <div className="text-center mb-10">
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
//               {data.bookTitle}
//             </h1>
//             <p className="mt-2 text-lg text-gray-600">
//               by <span className="font-semibold text-[#4E56C0]">{data.authorName}</span>
//             </p>
//           </div>

//           {/* === PRICE & CATEGORY === */}
//           <div className="flex flex-wrap justify-center gap-4 mb-10">
//             <div className="bg-[#4E56C0] text-white px-6 py-3 rounded-full font-bold text-lg">
//               {data.price}
//             </div>
//             <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium">
//               <FaTag className="text-[#9B5DE0]" />
//               {data.category}
//             </div>
//           </div>

//           <hr className="border-gray-200 mb-10" />

//           {/* === DESCRIPTION === */}
//           <div className="mb-12">
//             <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4">
//               <FaBook className="text-[#9B5DE0]" />
//               About This Book
//             </h2>
//             <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
//               {data.bookDescription}
//             </p>
//           </div>

//           {/* === SAMPLE PDF === */}
//           {data.bookPDFURL && (
//             <div className="text-center mb-12">
//               <a
//                 href={data.bookPDFURL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center gap-2 bg-[#4E56C0] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#3a4199] transition-colors"
//               >
//                 <FaBook />
//                 Read Sample
//               </a>
//             </div>
//           )}

//           {/* === USER ACTIONS === */}
//           {isLoggedIn && role === "user" && (
//             <div className="flex justify-center gap-4 mb-16">
//               <button
//                 onClick={toggleFavourite}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
//                   ${isFavourite ? "bg-[#D78FEE] text-white" : "bg-gray-100 text-[#4E56C0]"}`}
//               >
//                 <FaHeart />
//                 {isFavourite ? "Saved" : "Favourite"}
//               </button>

//               <button
//                 onClick={toggleCart}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
//                   ${isInCart ? "bg-[#4E56C0] text-white" : "bg-gray-100 text-[#4E56C0]"}`}
//               >
//                 <FaShoppingCart />
//                 {isInCart ? "In Cart" : "Add to Cart"}
//               </button>
//             </div>
//           )}

//           {/* === ADMIN ACTIONS === */}
//           {isLoggedIn && role === "admin" && (
//             <div className="flex justify-center gap-4 mb-16">
//               <Link
//                 to={`/UpdateBook/${id}`}
//                 className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-[#4E56C0] font-medium hover:bg-gray-200"
//               >
//                 <FaEdit />
//                 Edit
//               </Link>

//               <button
//                 onClick={deleteBook}
//                 className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200"
//               >
//                 <MdOutlineDelete />
//                 Delete
//               </button>
//             </div>
//           )}

//           {/* === BACK BUTTON – Bottom Right of Container === */}
//           <div className="flex justify-end mt-8">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-sm font-medium text-[#4E56C0] hover:text-[#3a4199]"
//             >
//               <FaArrowLeft />
//               Back to Books
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewBookDetails;

// pages/ViewBookDetails.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaEdit,
  FaHeart,
  FaShoppingCart,
  FaArrowLeft,
  FaTag,
  FaBook,
} from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [inCart, setInCart] = useState(false);

  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const role = useSelector((s) => s.auth.role);

  /* ─────────────────────── FETCH ─────────────────────── */
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(res.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  /* ─────────────────────── ACTIONS ─────────────────────── */
  const toggleFav = async () => {
    const res = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    setIsFav((v) => !v);
    alert(res.data.message);
  };
  const toggleCart = async () => {
    const res = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    setInCart((v) => !v);
    alert(res.data.message);
  };
  const deleteBook = async () => {
    if (!window.confirm("Delete this book permanently?")) return;
    const res = await axios.delete(
      "http://localhost:1000/api/v1/delete-book",
      { headers }
    );
    alert(res.data.message);
    navigate("/all-books");
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FDCFFA] to-white">
        <Loader />
      </div>
    );
  }

  /* ─────────────────────── RENDER ─────────────────────── */
  return (
    <div
      className="min-h-screen p-6 lg:p-12"
      style={{
        background: `linear-gradient(to bottom, #FDCFFA 0%, #ffffff 100%)`,
      }}
    >
      {/* FULL‑WIDTH CARD */}
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">

          {/* LEFT + RIGHT GRID */}
          <div className="grid lg:grid-cols-5 gap-8 p-8 lg:p-12">

            {/* ───── LEFT – COVER ───── */}
            <div className="lg:col-span-2 flex justify-center">
             <div className="w-64 h-96 md:w-80 md:h-[28rem] lg:w-96 lg:h-[32rem] bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-lg">
                <img
                  src={data.imageURL}
                  alt={data.bookTitle}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>

            {/* ───── RIGHT – INFO ───── */}
            <div className="lg:col-span-3 flex flex-col">

              {/* Title & Author */}
              <div className="mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {data.bookTitle}
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                  by{" "}
                  <span className="font-semibold text-[#4E56C0]">
                    {data.authorName}
                  </span>
                </p>
              </div>

              {/* Price + Category */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-[#4E56C0] text-white px-6 py-3 rounded-full font-bold text-xl">
                  {data.price}
                </div>
                <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium">
                  <FaTag className="text-[#9B5DE0]" />
                  {data.category}
                </div>
              </div>

              <hr className="border-gray-200 mb-8" />

              {/* Description */}
              <div className="mb-10">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-3">
                  <FaBook className="text-[#9B5DE0]" />
                  About This Book
                </h2>
                <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                  {data.bookDescription}
                </p>
              </div>

              {/* Sample PDF */}
              {data.bookPDFURL && (
                <div className="mb-10">
                  <a
                    href={data.bookPDFURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#4E56C0] text-white px-8 py-4 rounded-xl font-medium hover:bg-[#3a4199] transition-colors"
                  >
                    <FaBook />
                    Read Sample
                  </a>
                </div>
              )}

              {/* USER BUTTONS */}
              {isLoggedIn && role === "user" && (
                <div className="flex gap-4 mb-12">
                  <button
                    onClick={toggleFav}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
                      ${isFav ? "bg-[#D78FEE] text-white" : "bg-gray-100 text-[#4E56C0]"}`}
                  >
                    <FaHeart />
                    {isFav ? "Saved" : "Favourite"}
                  </button>

                  <button
                    onClick={toggleCart}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
                      ${inCart ? "bg-[#4E56C0] text-white" : "bg-gray-100 text-[#4E56C0]"}`}
                  >
                    <FaShoppingCart />
                    {inCart ? "In Cart" : "Add to Cart"}
                  </button>
                </div>
              )}

              {/* ADMIN BUTTONS */}
              {isLoggedIn && role === "admin" && (
                <div className="flex gap-4 mb-12">
                  <Link
                    to={`/UpdateBook/${id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-[#4E56C0] font-medium hover:bg-gray-200"
                  >
                    <FaEdit />
                    Edit
                  </Link>
                  <button
                    onClick={deleteBook}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-red-100 text-red-700 font-medium hover:bg-red-200"
                  >
                    <MdOutlineDelete />
                    Delete
                  </button>
                </div>
              )}

              {/* ───── BACK BUTTON – bottom‑right ───── */}
              <div className="mt-auto flex justify-end">
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-sm font-medium text-[#4E56C0] hover:text-[#3a4199]"
                >
                  <FaArrowLeft />
                  Back to Books
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;