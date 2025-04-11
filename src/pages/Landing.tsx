
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto py-10 px-4 md:py-20 max-w-4xl flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#00255A]">
            Haber İçerik Asistanı
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Yapay zeka destekli haber içeriği ve başlık oluşturma aracı
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mt-16">
          <div className="bg-gradient-to-br from-[#00255A]/5 to-[#00255A]/10 p-8 rounded-xl border border-[#00255A]/20 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#00255A] rounded-full flex items-center justify-center mb-6">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#00255A] mb-4">Haber Başlığı Ustası</h2>
            <p className="text-gray-600 mb-6">
              Dikkat çekici, SEO uyumlu ve etkili haber başlıkları saniyeler içinde oluşturun.
            </p>
            <Button 
              className="mt-auto bg-[#00255A] hover:bg-[#00366e]" 
              size="lg"
              onClick={() => navigate("/baslik-olustur")}
            >
              <FileText className="mr-2 h-5 w-5" />
              Başlık Oluştur
            </Button>
          </div>

          <div className="bg-gradient-to-br from-[#00255A]/5 to-[#00255A]/10 p-8 rounded-xl border border-[#00255A]/20 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#00255A] rounded-full flex items-center justify-center mb-6">
              <FilePlus className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#00255A] mb-4">Haber İçeriği Oluşturucu</h2>
            <p className="text-gray-600 mb-6">
              Konunuzu girin, profesyonel ve SEO uyumlu kapsamlı haber içerikleri elde edin.
            </p>
            <Button 
              className="mt-auto bg-[#00255A] hover:bg-[#00366e]" 
              size="lg"
              onClick={() => navigate("/haber-olustur")}
            >
              <FilePlus className="mr-2 h-5 w-5" />
              Haber Oluştur
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
