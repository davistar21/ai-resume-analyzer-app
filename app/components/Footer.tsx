import React from "react";
import {
  Facebook,
  Twitter,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 min-h-[50vh] ">
      <div className="w-full mx-auto flex items-center justify-around gap-8 flex-col md:flex-row">
        <div className="flex space-x-4">
          <a
            href="mailto:eyitayobembe@gmail.com"
            aria-label="Email"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Mail size={20} />
          </a>
          <a
            href={`https://wa.me/2348085716180?text=${"Hello, I am interested in your services"}`}
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href="https://github.com/davistar21"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/eyitayo-obembe/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* About / Branding */}
        <div>
          <p>
            I build beautiful web apps and helpful tools. Thanks for stopping
            by.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} | Obembe Eyitayo | All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
