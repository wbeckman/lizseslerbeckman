// Header.jsx

import React from "react";
import PianoIcon from "./PianoIcon";

const Header = ({ activeTab, onNavClick }) => {
  const navLinks = [
    { name: "Home", href: "Home" },
    { name: "About", href: "About" },
    { name: "Upcoming", href: "Upcoming" },
    // { name: "Recordings", href: "Recordings" },
    // { name: "Testimonials", href: "Testimonials" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white text-black z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left side: ESB + Piano */}
        <div className="flex items-center space-x-3">
          <span
            style={{ fontFamily: "'Mea Culpa', cursive" }}
            className="text-2xl"
          >
            ESB
          </span>
          <PianoIcon />
        </div>

        {/* Right side: Navigation */}
        <nav
          className="flex space-x-6 text-base font-normal"
          style={{ fontFamily: "'Instrument Sans', sans-serif" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              // Use a button so we can handle onClick easily without interfering
              onClick={() => onNavClick(link.href)}
              className={`${
                activeTab === link.href ? "underline" : ""
              } text-black hover:underline transition-colors`}
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
