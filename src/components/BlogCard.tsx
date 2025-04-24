
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BlogPost } from "@/utils/blogData";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const { id, title, date, excerpt, tags, coverImage } = post;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className={`group overflow-hidden border-none shadow-none bg-transparent transition-all duration-500 hover:scale-[1.01] ${featured ? 'md:h-[400px]' : ''}`}>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex flex-col flex-grow space-y-4">
          <CardHeader className="p-0 space-y-4">
            <div className="space-y-2">
              <Link 
                to={`/post/${id}`} 
                className="group-hover:text-[#007AFF] transition-colors"
              >
                <h3 className={`font-medium tracking-tight ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{title}</h3>
              </Link>
              <p className="text-muted-foreground text-sm font-light">
                {formattedDate}
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <p className="text-muted-foreground font-light leading-relaxed line-clamp-3">{excerpt}</p>
          </CardContent>
          
          <CardFooter className="p-0">
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="rounded-full font-light px-4">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </div>

        <div className={`${featured ? 'md:w-[400px]' : 'md:w-[300px]'} shrink-0 order-first md:order-last`}>
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl">
            <img 
              src={coverImage} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </AspectRatio>
        </div>
      </div>
    </Card>
  );
}

