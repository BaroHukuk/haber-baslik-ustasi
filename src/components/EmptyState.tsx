
import React from "react";
import { Newspaper } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-[#00255A]/10 p-4 rounded-full mb-4">
        <Newspaper className="h-12 w-12 text-[#00255A]" />
      </div>
      <h3 className="text-xl font-medium mb-2 text-[#00255A]">Haber Başlığı Üreteci</h3>
      <p className="text-muted-foreground max-w-md">
        Haber konunuzu girin, başlık stilinizi seçin ve Grok API anahtarınızı kullanarak 
        yaratıcı haber başlıkları oluşturun.
      </p>
    </div>
  );
};

export default EmptyState;
