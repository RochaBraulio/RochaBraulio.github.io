
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
    <Card className={`group overflow-hidden border-none shadow-none transition-all duration-500 hover:scale-[1.02] ${featured ? 'md:flex md:h-[600px]' : ''}`}>
      <div className={`${featured ? 'md:w-2/3 h-full' : 'h-[400px]'} relative overflow-hidden rounded-2xl`}>
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      
      <div className={`${featured ? 'md:w-1/3 md:pl-8' : ''} flex flex-col pt-6`}>
        <CardHeader className="p-0 space-y-4">
          <div className="space-y-2">
            <Link to={`/post/${id}`} className="group-hover:text-primary transition-colors">
              <h3 className={`font-medium tracking-tight ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{title}</h3>
            </Link>
            <p className="text-muted-foreground text-sm font-light">
              {formattedDate} · {author}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 pt-4">
          <p className="text-muted-foreground font-light leading-relaxed line-clamp-3">{excerpt}</p>
        </CardContent>
        
        <CardFooter className="p-0 pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="rounded-full font-light px-4">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-xs text-muted-foreground font-light">{views} views</div>
        </CardFooter>
      </div>
    </Card>
  );
}
