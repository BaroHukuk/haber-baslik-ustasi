
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewsContentForm from "@/components/NewsContentForm";
import NewsResults from "@/components/NewsResults";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useToast } from "@/components/ui/use-toast";

const HaberOlustur = () => {
  const [newsContent, setNewsContent] = useState<{
    title: string;
    spot: string;
    intro: string;
    sections: {title: string, content: string}[];
    tags: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (topic: string, style: string, apiKey: string) => {
    setIsLoading(true);
    try {
      // Oluşturulacak prompt
      const prompt = `Sen profesyonel bir haber editörüsün. Aşağıdaki konuya göre bir haber içeriği üret.  
Stil: ${style}  
Konu: ${topic}  
Kurallar:  
- Tamamen insan elinden çıkmış olacak
- Kesinlikle yapay zekadan yazıldığı belli olmayacak
- Kendi yorumunu katacak
- Google SEO ve Google Keşfet uyumlu olacak
- Gelişmiş ve profesyönel bir dil kullanılacak
- Aşağıdaki formatta olmalı:

1. Haber başlığı (Dikkat çekici ve SEO uyumlu)
2. Spot (Haberin özeti, 1-2 cümle)
3. Haber giriş (Detaylı açıklama)
4. Alt başlıklar ve açıklamaları (En az 2 alt başlık)
5. 4 tane etiket (Hashtag formatında)`;

      // Grok API isteği
      const response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "grok-3-latest",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("API hata yanıtı:", errorData);
        throw new Error(`API hatası: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // İçeriği ayrıştırma
      const title = content.match(/(?:başlık:|başlığı:|1\.\s*)(.*?)(?=\n\s*(?:spot:|2\.))/is)?.[1]?.trim() || "";
      const spot = content.match(/(?:spot:|özet:|2\.\s*)(.*?)(?=\n\s*(?:giriş:|3\.))/is)?.[1]?.trim() || "";
      const intro = content.match(/(?:giriş:|3\.\s*)(.*?)(?=\n\s*(?:alt başlık|4\.))/is)?.[1]?.trim() || "";
      
      // Alt başlıklar ve içeriklerini bulma
      const sectionsRegex = /(?:alt başlık|4\.).*?(?=\n\s*(?:etiket|5\.|$))/is;
      const sectionsMatch = content.match(sectionsRegex);
      
      const sections: {title: string, content: string}[] = [];
      if (sectionsMatch && sectionsMatch[0]) {
        const sectionLines = sectionsMatch[0].split('\n');
        let currentTitle = "";
        let currentContent = "";
        
        for (let i = 1; i < sectionLines.length; i++) {
          const line = sectionLines[i].trim();
          if (line.match(/^[•\-*]?\s*[A-Z0-9]/)) {
            // Yeni alt başlık
            if (currentTitle && currentContent) {
              sections.push({title: currentTitle, content: currentContent.trim()});
            }
            currentTitle = line.replace(/^[•\-*]?\s*/, "");
            currentContent = "";
          } else if (line && currentTitle) {
            currentContent += line + " ";
          }
        }
        
        if (currentTitle && currentContent) {
          sections.push({title: currentTitle, content: currentContent.trim()});
        }
      }

      // Etiketleri ayıklama
      const tagsMatch = content.match(/(?:etiket|5\.\s*)(.*?)$/is);
      const tags: string[] = [];
      
      if (tagsMatch && tagsMatch[1]) {
        const tagContent = tagsMatch[1].trim();
        const tagMatches = tagContent.match(/#\w+|(?:\d+\.\s*|\-\s*|\•\s*)([^,\n]+)/g);
        
        if (tagMatches) {
          tagMatches.slice(0, 4).forEach(tag => {
            const cleanTag = tag.replace(/^\d+\.\s*|\-\s*|\•\s*/, "").trim();
            if (!cleanTag.startsWith('#')) {
              tags.push('#' + cleanTag.replace(/\s+/g, ''));
            } else {
              tags.push(cleanTag.replace(/\s+/g, ''));
            }
          });
        }
      }

      // Sonuçları ayarla
      setNewsContent({
        title,
        spot,
        intro,
        sections,
        tags
      });
    } catch (error) {
      console.error("API hatası:", error);
      toast({
        title: "Hata",
        description: "Haber içeriği oluşturulurken bir hata oluştu. API anahtarınızı kontrol edin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="container mx-auto py-6 px-4 md:py-10 max-w-4xl flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#00255A]">Haber İçeriği Oluşturucu</h1>
          <p className="text-muted-foreground mt-2">
            Profesyonel ve SEO uyumlu haber içerikleri saniyeler içinde
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_1fr] items-start">
          <Card className="border-[#00255A]/20">
            <CardHeader className="bg-gradient-to-r from-[#00255A]/10 to-transparent">
              <CardTitle className="text-[#00255A]">İçerik Oluştur</CardTitle>
            </CardHeader>
            <CardContent>
              <NewsContentForm onSubmit={handleSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>

          <Card className="border-[#00255A]/20">
            <CardHeader className="bg-gradient-to-r from-[#00255A]/10 to-transparent">
              <CardTitle className="text-[#00255A]">Sonuçlar</CardTitle>
            </CardHeader>
            <CardContent>
              {newsContent ? (
                <NewsResults newsContent={newsContent} />
              ) : (
                <EmptyState type="news" />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HaberOlustur;
