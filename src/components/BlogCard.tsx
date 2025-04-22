
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BlogPost } from "@/utils/blogData";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const { id, title, date, author, excerpt, tags, views, coverImage } = post;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className={`overflow-hidden transition-all duration-200 hover:shadow-md ${featured ? 'md:flex md:h-72' : ''}`}>
      <div className={`${featured ? 'md:w-1/2 h-full' : 'h-48'} relative overflow-hidden`}>
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className={featured ? 'md:w-1/2 flex flex-col' : ''}>
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <Link to={`/post/${id}`} className="hover:underline">
                <h3 className={`font-bold tracking-tight ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>{title}</h3>
              </Link>
              <p className="text-muted-foreground text-sm">
                By {author} · {formattedDate}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 pt-2 flex-grow">
          <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">{views} views</div>
        </CardFooter>
      </div>
    </Card>
  );
}
