import React from 'react';
import { Heart, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-[#5956E9] to-[#7C3AED] text-white">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold font-playfair">Book'Store</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-center">
            <span className="text-sm md:text-base">© 2024 Made with</span>
            <Heart className="w-4 h-4 text-pink-300 fill-pink-300 animate-pulse" />
            <span className="text-sm md:text-base">by</span>
            <span className="font-bold">KRISHNA BANSAL</span>
          </div>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;