
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PostHeaderProps {
  title: string;
  date: string;
  tags: string[];
  coverImage: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ 
  title, 
  date, 
  tags, 
  coverImage 
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div className="w-full h-[80vh] relative">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>
      
      <div className="prose-container -mt-40 relative">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-base text-muted-foreground font-light">
            <span>{formattedDate}</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="rounded-full px-4 py-1 text-sm font-light">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
