
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus, Home } from "lucide-react";

const Navigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="bg-[#00255A] text-white py-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <Home className="h-5 w-5" />
          <span className="hidden sm:inline">FiBilişim</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <Button 
            asChild 
            variant={location.pathname === "/baslik-olustur" ? "secondary" : "ghost"} 
            className="text-white"
          >
            <Link to="/baslik-olustur">
              <FileText className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Başlık Oluştur</span>
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant={location.pathname === "/haber-olustur" ? "secondary" : "ghost"} 
            className="text-white"
          >
            <Link to="/haber-olustur">
              <FilePlus className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Haber Oluştur</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
