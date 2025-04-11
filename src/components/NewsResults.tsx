
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface NewsResultsProps {
  newsContent: {
    title: string;
    spot: string;
    intro: string;
    sections: {title: string, content: string}[];
    tags: string[];
  };
}

const NewsResults: React.FC<NewsResultsProps> = ({ newsContent }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    // Tüm içeriği bir araya getir
    const fullContent = `
${newsContent.title}

${newsContent.spot}

${newsContent.intro}

${newsContent.sections.map(section => `${section.title}\n${section.content}`).join('\n\n')}

${newsContent.tags.join(' ')}
    `.trim();

    navigator.clipboard.writeText(fullContent).then(() => {
      setCopied(true);
      toast({
        title: "Başarılı",
        description: "Haber içeriği panoya kopyalandı!",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Oluşturulan İçerik</h2>
        <Button 
          onClick={copyToClipboard} 
          variant="outline" 
          className="bg-[#00255A] text-white hover:bg-[#00366e]"
        >
          <Copy className="mr-2 h-4 w-4" />
          Tümünü Kopyala
        </Button>
      </div>

      <div className="space-y-6 mt-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-[#00255A]">Başlık</h3>
          <div className="p-3 bg-[#00255A]/5 rounded-md">
            {newsContent.title}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg text-[#00255A]">Spot</h3>
          <div className="p-3 bg-[#00255A]/5 rounded-md">
            {newsContent.spot}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg text-[#00255A]">Giriş</h3>
          <div className="p-3 bg-[#00255A]/5 rounded-md whitespace-pre-wrap">
            {newsContent.intro}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg text-[#00255A]">Alt Başlıklar ve İçerikler</h3>
          {newsContent.sections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h4 className="font-semibold">{section.title}</h4>
              <div className="p-3 bg-[#00255A]/5 rounded-md whitespace-pre-wrap">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg text-[#00255A]">Etiketler</h3>
          <div className="flex flex-wrap gap-2">
            {newsContent.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-[#00255A] text-white px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsResults;
