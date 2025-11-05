import React, { useState, useEffect } from "react";
import "../../index.css";
import { Link, useLocation } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ShoppingCart, User, Home, BookOpen, Info, Menu, X, ChevronDown } from "lucide-react";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const [MobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const links = [
    {
      title: "Home",
      link: "/",
      icon: Home,
    },
    {
      title: "About",
      link: "/about-us",
      icon: Info,
    },
    {
      title: "All Books",
      link: "/all-books",
      icon: BookOpen,
    },
    {
      title: "Cart",
      link: "/cart",
      icon: ShoppingCart,
    },
    {
      title: "Profile",
      link: "/profile",
      icon: User,
    },
    {
      title: "Admin Profile",
      link: "/profile",
      icon: User,
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const filteredLinks = links.filter(link => {
    if (!isLoggedIn && (link.title === "Cart" || link.title === "Profile" || link.title === "Admin Profile")) {
      return false;
    }
    if (isLoggedIn && role === "user" && link.title === "Admin Profile") {
      return false;
    }
    if (isLoggedIn && role === "admin" && (link.title === "Cart" || link.title === "Profile")) {
      return false;
    }
    return true;
  });

  // Fetch cart count when user is logged in
  useEffect(() => {
    const fetchCartCount = async () => {
      if (isLoggedIn && role === "user") {
        try {
          const headers = {
            id: localStorage.getItem("id"),
            authorization: `Bearer ${localStorage.getItem("token")}`,
          };
          const response = await axios.get(
            "http://localhost:1000/api/v1/get-user-cart",
            { headers }
          );
          setCartCount(response.data.data?.length || 0);
        } catch (error) {
          console.error("Error fetching cart:", error);
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };

    fetchCartCount();
    
    // Optional: Set up an interval to refresh cart count periodically
    const interval = setInterval(fetchCartCount, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [isLoggedIn, role, location.pathname]); // Re-fetch when route changes

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (MobileNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [MobileNav]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-xl py-3" 
            : "bg-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#5956E9] to-[#7C3AED] rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-[#5956E9] to-[#7C3AED] p-2 rounded-xl transform group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#5956E9] to-[#7C3AED] bg-clip-text text-transparent font-playfair">
                  Book'Store
                </h1>
                <p className="text-xs text-gray-500 hidden md:block">Discover Your Next Read</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {filteredLinks.map((item, i) => {
                const Icon = item.icon;
                const active = isActive(item.link);
                
                return (
                  <Link
                    key={i}
                    to={item.link}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 group ${
                      active
                        ? "text-[#5956E9]"
                        : "text-gray-700 hover:text-[#5956E9]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${
                      active ? "scale-110" : "group-hover:scale-110"
                    }`} />
                    <span>{item.title}</span>
                    
                    {/* Cart Badge */}
                    {item.title === "Cart" && cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse">
                        {cartCount}
                      </span>
                    )}
                    
                    {/* Active Indicator */}
                    {active && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-[#5956E9] to-[#7C3AED] rounded-full"></div>
                    )}
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#5956E9]/5 to-[#7C3AED]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            {isLoggedIn === false && (
              <div className="hidden lg:flex gap-3 items-center">
                <Link
                  to="/SignIn"
                  className="px-6 py-2.5 text-[#5956E9] font-semibold rounded-xl hover:bg-[#5956E9]/10 transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  to="/SignUp"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#5956E9] to-[#7C3AED] text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
                >
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setMobileNav(!MobileNav)}
            >
              {MobileNav ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          MobileNav ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
            MobileNav ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileNav(false)}
        ></div>

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 w-full sm:w-96 h-full bg-gradient-to-br from-[#5956E9] via-[#6b67eb] to-[#7C3AED] shadow-2xl transform transition-transform duration-500 ${
            MobileNav ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-8 pt-24">
            {/* User Info Section (if logged in) */}
            {isLoggedIn && (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-[#5956E9]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Welcome back!</p>
                    <p className="text-white/70 text-sm">{role === "admin" ? "Admin" : "User"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex-1 space-y-2 overflow-y-auto">
              {filteredLinks.map((item, i) => {
                const Icon = item.icon;
                const active = isActive(item.link);
                
                return (
                  <Link
                    key={i}
                    to={item.link}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      active
                        ? "bg-white text-[#5956E9] shadow-lg"
                        : "bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
                    }`}
                    onClick={() => setMobileNav(false)}
                  >
                    <div className={`p-2 rounded-lg ${
                      active ? "bg-[#5956E9] text-white" : "bg-white/20"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg font-semibold">{item.title}</span>
                    {item.title === "Cart" && cartCount > 0 && (
                      <span className="ml-auto w-6 h-6 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons (Mobile) */}
            {isLoggedIn === false && (
              <div className="space-y-3 pt-6 border-t border-white/20">
                <Link
                  to="/SignIn"
                  className="block w-full text-center px-6 py-4 bg-white text-[#5956E9] font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => setMobileNav(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/SignUp"
                  className="block w-full text-center px-6 py-4 bg-white/20 backdrop-blur-md text-white font-bold rounded-xl border-2 border-white/50 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setMobileNav(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Footer */}
            <div className="pt-6 border-t border-white/20 mt-6">
              <p className="text-white/70 text-sm text-center">
                © 2024 Book'Store. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;