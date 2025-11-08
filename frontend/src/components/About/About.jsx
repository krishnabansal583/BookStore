import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, TrendingUp, Heart, Mail, MapPin, Phone, Star, ChevronRight, X } from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [showContactPopup, setShowContactPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers = [];
    document.querySelectorAll('.fade-in').forEach((el, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [index]: true }));
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  const stats = [
    { icon: BookOpen, label: 'Books Available', value: '50+' },
    { icon: Users, label: 'Happy Readers', value: '100+' },
    { icon: Award, label: 'Awards Won', value: '5+' },
    { icon: TrendingUp, label: 'Years Experience', value: '3+' }
  ];

  const team = [
    { name: 'Krishna Bansal', role: 'Founder & CEO', image: 'KB' },
    { name: 'Michael Chen', role: 'Head Curator', image: 'MC' },
    { name: 'Emily Rodriguez', role: 'Community Manager', image: 'ER' },
    { name: 'David Kim', role: 'Tech Lead', image: 'DK' }
  ];

  const values = [
    { icon: Heart, title: 'Passion for Reading', desc: 'We believe books have the power to transform lives and open minds.' },
    { icon: Users, title: 'Community First', desc: 'Building a thriving community of book lovers is at our core.' },
    { icon: Award, title: 'Quality Curation', desc: 'Every book is carefully selected to ensure the best reading experience.' },
    { icon: Star, title: 'Customer Delight', desc: 'Your satisfaction and reading journey matter most to us.' }
  ];

  const testimonials = [
    { name: 'Alice Thompson', text: 'The best bookstore experience I\'ve ever had. Amazing selection!', rating: 5 },
    { name: 'Robert Martinez', text: 'Fast delivery and books always arrive in perfect condition.', rating: 5 },
    { name: 'Sophie Anderson', text: 'Their recommendations are spot-on. Found so many great reads!', rating: 5 }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #ffffff, #ffcccb)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-violet-500 text-white">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <div className="text-center fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              BookStore
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed opacity-95">
              Connecting readers with extraordinary stories since 2010
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl fade-in"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in">
          {['story', 'values', 'team'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Story Tab */}
        {activeTab === 'story' && (
          <div className="space-y-12 fade-in">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">How It All Began</h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
                <p>
                  In 2010, our founder Krishna Bansal opened a small bookshop in the heart of the city with a simple dream: 
                  to create a haven where book lovers could discover their next favorite read and connect with fellow enthusiasts.
                </p>
                <p>
                  What started as a cozy corner store with carefully curated shelves has grown into a thriving online community 
                  serving readers across the country. We've stayed true to our roots—every book in our collection is chosen with 
                  the same care and passion as that first shelf Krishna stocked fifteen years ago.
                </p>
                <p>
                  Today, we're proud to offer over 50 titles across every genre imaginable, from timeless classics to 
                  the latest bestsellers. But more than that, we've built a community of over 100 readers who share our 
                  love for the written word.
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-purple-500 to-violet-500 text-white rounded-3xl shadow-xl p-8">
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg leading-relaxed opacity-95">
                  To make quality literature accessible to everyone and foster a global community of passionate readers 
                  who believe in the transformative power of books.
                </p>
              </div>
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-3xl shadow-xl p-8">
                <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg leading-relaxed opacity-95">
                  To become the world's most loved bookstore, where every reader finds their perfect book and every book 
                  finds its perfect reader.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Values Tab */}
        {activeTab === 'values' && (
          <div className="grid md:grid-cols-2 gap-8 fade-in">
            {values.map((value, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <value.icon className="w-16 h-16 text-purple-500 mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="space-y-12 fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-600">Passionate people dedicated to bringing you the best reading experience</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {team.map((member, idx) => (
                <div 
                  key={idx}
                  className="text-center group"
                >
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                      {member.image}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 fade-in">What Our Readers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 fade-in"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-800">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-500 to-violet-500 rounded-3xl shadow-2xl p-12 text-white text-center fade-in">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl mb-8 opacity-95">We'd love to hear from you!</p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6" />
              <span>hello@bookstore.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-6 h-6" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6" />
              <span>123 Book Street, Reading City</span>
            </div>
          </div>
          <button 
            onClick={() => setShowContactPopup(true)}
            className="bg-white text-purple-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
          >
            Contact Us <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Contact Popup Modal */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
            <button 
              onClick={() => setShowContactPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Call Us Now</h3>
              <p className="text-gray-600 mb-6">We're here to help you find your next great read!</p>
              
              <a 
                href="tel:+15551234567"
                className="block bg-gradient-to-r from-purple-500 to-violet-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-4"
              >
                📞 +1 (555) 123-4567
              </a>
              
              <div className="space-y-3 text-left bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <a href="mailto:hello@bookstore.com" className="text-gray-600 hover:text-purple-500">hello@bookstore.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">Address</p>
                    <p className="text-gray-600">123 Book Street, Reading City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}