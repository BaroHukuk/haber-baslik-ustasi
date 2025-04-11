
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeadlineForm from "@/components/HeadlineForm";
import HeadlineResults from "@/components/HeadlineResults";
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (topic: string, style: string, apiKey: string) => {
    setIsLoading(true);
    try {
      // Oluşturulacak prompt
      const prompt = `Sen yaratıcı bir haber editörüsün. Aşağıdaki konuya göre 5 Türkçe haber başlığı üret.  
Stil: ${style}  
Konu: ${topic}  
Kurallar:  
- Maksimum 90 karakter  
- Sadece başlıklar, numaralandırılmış liste halinde`;

      // Grok API isteği
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`API hatası: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Basit bir regex ile numaralı başlıkları ayıklayalım
      const headlineRegex = /\d+\.\s*(.*?)(?=\n\d+\.|\n*$)/gs;
      const extractedHeadlines: string[] = [];
      
      let match;
      while ((match = headlineRegex.exec(content)) !== null) {
        if (match[1] && match[1].trim()) {
          extractedHeadlines.push(match[1].trim());
        }
      }

      // Eğer regex ile düzgün ayıklayamazsak, satırlara bölerek deneyelim
      if (extractedHeadlines.length === 0) {
        const lines = content.split('\n').filter(line => line.trim());
        const filtered = lines.filter(line => /^\d+\./.test(line));
        
        for (const line of filtered) {
          const withoutNumber = line.replace(/^\d+\.\s*/, '').trim();
          if (withoutNumber) {
            extractedHeadlines.push(withoutNumber);
          }
        }
      }

      setHeadlines(extractedHeadlines.slice(0, 5));
      
      if (extractedHeadlines.length === 0) {
        toast({
          title: "Hata",
          description: "API'den alınan yanıt işlenemedi. Farklı bir konu deneyin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("API hatası:", error);
      toast({
        title: "Hata",
        description: "Başlık üretilirken bir hata oluştu. API anahtarınızı kontrol edin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto py-6 px-4 md:py-10 max-w-4xl flex-grow">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#00255A]">Haber Başlığı Ustası</h1>
          <p className="text-muted-foreground mt-2">
            Yaratıcı ve etkili haber başlıkları saniyeler içinde
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_1fr] items-start">
          <Card className="border-[#00255A]/20">
            <CardHeader className="bg-gradient-to-r from-[#00255A]/10 to-transparent">
              <CardTitle className="text-[#00255A]">Başlık Oluştur</CardTitle>
            </CardHeader>
            <CardContent>
              <HeadlineForm onSubmit={handleSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>

          <Card className="border-[#00255A]/20">
            <CardHeader className="bg-gradient-to-r from-[#00255A]/10 to-transparent">
              <CardTitle className="text-[#00255A]">Sonuçlar</CardTitle>
            </CardHeader>
            <CardContent>
              {headlines.length > 0 ? (
                <HeadlineResults headlines={headlines} />
              ) : (
                <EmptyState />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
