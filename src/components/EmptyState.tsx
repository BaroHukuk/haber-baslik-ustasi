
import React from "react";
import { Newspaper, FileText } from "lucide-react";

interface EmptyStateProps {
  type?: "headline" | "news";
}

const EmptyState: React.FC<EmptyStateProps> = ({ type = "headline" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-[#00255A]/10 p-4 rounded-full mb-4">
        {type === "headline" ? (
          <FileText className="h-12 w-12 text-[#00255A]" />
        ) : (
          <Newspaper className="h-12 w-12 text-[#00255A]" />
        )}
      </div>
      <h3 className="text-xl font-medium mb-2 text-[#00255A]">
        {type === "headline" ? "Haber Başlığı Üreteci" : "Haber İçeriği Üreteci"}
      </h3>
      <p className="text-muted-foreground max-w-md">
        {type === "headline" 
          ? "Haber konunuzu girin, başlık stilinizi seçin ve Grok API anahtarınızı kullanarak yaratıcı haber başlıkları oluşturun."
          : "Haber konunuzu girin, içerik stilinizi seçin ve Grok API anahtarınızı kullanarak profesyonel haber içerikleri oluşturun."}
      </p>
    </div>
  );
};

export default EmptyState;
