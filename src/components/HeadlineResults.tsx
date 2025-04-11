
import React from "react";
import HeadlineCard from "./HeadlineCard";

interface HeadlineResultsProps {
  headlines: string[];
}

const HeadlineResults: React.FC<HeadlineResultsProps> = ({ headlines }) => {
  if (!headlines.length) return null;

  return (
    <div className="space-y-4 fade-in">
      <h2 className="text-xl font-semibold">Önerilen Başlıklar</h2>
      <div className="space-y-3">
        {headlines.map((headline, index) => (
          <HeadlineCard 
            key={index} 
            headline={headline} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default HeadlineResults;
