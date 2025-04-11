
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface HeadlineCardProps {
  headline: string;
  index: number;
}

const HeadlineCard: React.FC<HeadlineCardProps> = ({ headline, index }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(headline).then(() => {
      setCopied(true);
      toast({
        title: "Başarılı",
        description: "Başlık panoya kopyalandı!",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <Card className="headline-card shadow-sm hover:shadow transition-all duration-200">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-start space-x-3">
          <span className="font-medium text-primary mt-0.5">{index + 1}.</span>
          <p className="text-base">{headline}</p>
        </div>
        <Button 
          onClick={copyToClipboard} 
          variant="outline" 
          size="sm" 
          className="shrink-0 ml-2"
        >
          <Copy className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Kopyala</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default HeadlineCard;
