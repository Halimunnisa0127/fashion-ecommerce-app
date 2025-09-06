// src/components/Footer.jsx
import React from "react";
import { useSelector } from "react-redux";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const iconMap = {
  facebook: <FaFacebookF className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
  linkedin: <FaLinkedinIn className="w-5 h-5" />,
  twitter: <FaTwitter className="w-5 h-5" />,
};

const Footer = () => {
  const links = useSelector((state) => state.footer.links);
  const social = useSelector((state) => state.footer.social);

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Your Company</h3>
          <p className="text-sm leading-relaxed text-gray-400">
            Building modern solutions with passion and innovation.  
            Let’s grow together.
          </p>
        </div>

      

        {/* Column 3: Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            {social.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 hover:text-white transition-colors"
              >
                {iconMap[s.icon]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
