import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Categeory from "./Categeory";
import Footer from "../layouts/Footer";

const UserHome = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const distanceFromBottom = docHeight - (scrollTop + windowHeight);

    // Show ↓ when near top; show ↑ when near bottom (within 300px)
    if (scrollTop < 100) {
      setIsTop(true);
    } else if (distanceFromBottom < 300) {
      setIsTop(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div>
      <Header />
      <Categeory />
      <Footer />

      {/* Scroll Arrow Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isTop ? (
          <button
            onClick={scrollToBottom}
            className="cursor-pointer bg-pink-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-pink-500 transition duration-300"
            title="Scroll Down"
          >
            ↓
          </button>
        ) : (
          <button
            onClick={scrollToTop}
            className="bg-pink-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-pink-500 transition duration-300"
            title="Scroll Up"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

export default UserHome;
