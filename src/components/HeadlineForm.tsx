
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

interface HeadlineFormProps {
  onSubmit: (topic: string, style: string, apiKey: string) => void;
  isLoading: boolean;
}

const HeadlineForm: React.FC<HeadlineFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("nötr");
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  // localStorage'den API anahtarını yükle
  useEffect(() => {
    const savedApiKey = localStorage.getItem("grokApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen bir haber konusu girin.",
        variant: "destructive",
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen Grok API anahtarı girin.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(topic, style, apiKey);
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen kaydetmek için bir API anahtarı girin.",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem("grokApiKey", apiKey);
    toast({
      title: "Başarılı",
      description: "API anahtarınız kaydedildi.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="topic">Haber Konusu</Label>
        <Textarea
          id="topic"
          placeholder="Haber konusunu girin..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="resize-none"
          rows={3}
        />
      </div>

      <div className="space-y-3">
        <Label>Başlık Stili</Label>
        <RadioGroup 
          value={style} 
          onValueChange={setStyle}
          className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="clickbait" id="clickbait" />
            <Label htmlFor="clickbait" className="font-normal">Clickbait</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="SEO uyumlu" id="seo" />
            <Label htmlFor="seo" className="font-normal">SEO Uyumlu</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nötr" id="notr" />
            <Label htmlFor="notr" className="font-normal">Nötr</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="apiKey">Grok API Anahtarı</Label>
        <div className="flex gap-2">
          <Input
            id="apiKey"
            type="password"
            placeholder="API anahtarınızı girin"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={saveApiKey}
            className="bg-[#00255A] text-white hover:bg-[#00366e]"
          >
            <Save className="mr-2 h-4 w-4" /> Kaydet
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          API anahtarınız güvenli bir şekilde sadece istekleri göndermek için kullanılacaktır.
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#00255A] hover:bg-[#00366e]" 
        disabled={isLoading}
      >
        {isLoading ? "Başlıklar Oluşturuluyor..." : "Başlık Üret"}
      </Button>
    </form>
  );
};

export default HeadlineForm;
