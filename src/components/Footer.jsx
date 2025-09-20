// Footer.jsx
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-heroBG text-gray-300 py-8 px-6">
      <div className="text-center text-sm mt-8 border-t border-gray-600 pt-4"/>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + About */}
        <div>
          <h1 className="text-2xl font-bold text-green-400">Greenpeace</h1>
          <p className="mt-3 text-sm">
            Working towards a sustainable and green future.  
            Join us in making the planet healthier and cleaner.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-400">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-green-300">Home</a></li>
            <li><a href="#about" className="hover:text-green-300">About</a></li>
            <li><a href="#publications" className="hover:text-green-300">Publications</a></li>
            <li><a href="#contact" className="hover:text-green-300">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-400">Follow Us</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-green-300">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-green-300">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-green-300">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-green-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8 border-t border-gray-600 pt-4">
        © {new Date().getFullYear()} Greenpeace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
