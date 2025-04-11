
import React from "react";
import { Globe } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#00255A] text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2">
          <Globe size={18} />
          <p>© {currentYear} Yazılım Fibilişim</p>
        </div>
        <div className="text-xs mt-1 text-gray-300">
          <a 
            href="https://www.fibilisim.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            www.fibilisim.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
