import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useSearch } from "@/hooks/useSearch";
import { blogPosts, getPostById, trackPageView } from "@/utils/blogData";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch(blogPosts);
  
  const post = id ? getPostById(id) : undefined;
  
  useEffect(() => {
    if (id) {
      trackPageView(id);
    }
  }, [id]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      navigate('/');
    }
  };
  
  if (!post) {
    return (
      <Layout onSearch={handleSearch}>
        <div className="container py-12 text-center">
          <h1 className="text-3xl font-bold">Post Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Return to Home
          </button>
        </div>
      </Layout>
    );
  }
  
  const { title, date, author, coverImage, tags, content } = post;
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout onSearch={handleSearch}>
      <article className="animate-in">
        {/* Cover Image */}
        <div className="w-full h-72 md:h-96 relative">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        {/* Post Header */}
        <div className="prose-container -mt-20 relative">
          <div className="bg-card shadow-lg rounded-lg p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-4 text-sm text-muted-foreground">
              <span>By {author}</span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Post Content */}
        <div className="prose-container py-8">
          <div className="blog-content">
            <ReactMarkdown
              components={{
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      language={match[1]}
                      style={vscDarkPlus}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Post;
