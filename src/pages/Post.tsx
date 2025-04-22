import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { PrismLight } from 'react-syntax-highlighter';
import { Copy } from 'lucide-react';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import gcode from 'react-syntax-highlighter/dist/esm/languages/prism/gcode';

import { Layout } from "@/components/Layout";
import { useSearch } from "@/hooks/useSearch";
import { blogPosts, getPostById, trackPageView } from "@/utils/blogData";
import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/ShareButtons";
import { Comments } from "@/components/Comments";
import { StlViewer } from "@/components/StlViewer";
import { PyPlot } from "@/components/PyPlot";

// Register language for GCode syntax highlighting
PrismLight.registerLanguage('gcode', gcode);

const vsCodeLightTheme = {
  'code[class*="language-"]': {
    color: '#333333',
    background: 'transparent',
    textShadow: 'none',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '4',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#333333',
    background: 'rgba(0, 0, 0, 0.02)',
    textShadow: 'none',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '4',
    hyphens: 'none',
    padding: '1.25em',
    margin: '1em 0',
    overflow: 'auto',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '6px',
  },
  'comment': { color: '#408080', fontStyle: 'italic' },
  'property': { color: '#008000' },
  'tag': { color: '#000080' },
  'boolean': { color: '#000080' },
  'number': { color: '#000080' },
  'constant': { color: '#000080' },
  'symbol': { color: '#000080' },
  'string': { color: '#BA2121' },
  'selector': { color: '#000080' },
  'attr-name': { color: '#008000' },
  'entity': { cursor: 'help' },
  'url': { color: '#0000FF' },
  'keyword': { color: '#008000', fontWeight: 'bold' },
  'builtin': { color: '#008000' },
  'function': { color: '#0000FF' },
  'operator': { color: '#AA22FF', fontWeight: 'bold' }
};

const vsCodeDarkTheme = {
  'code[class*="language-"]': {
    color: '#D4D4D4',
    background: 'transparent',
    textShadow: 'none',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '4',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    color: '#D4D4D4',
    background: 'rgba(255, 255, 255, 0.03)',
    textShadow: 'none',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: '4',
    hyphens: 'none',
    padding: '1.25em',
    margin: '1em 0',
    overflow: 'auto',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
  },
  'pre code': {
    background: 'none',
    fontSize: '1em',
  },
  ':not(pre) > code[class*="language-"]': {
    background: '#1E1E1E',
    padding: '.1em',
    borderRadius: '.3em',
    whiteSpace: 'normal',
  },
  'comment': { color: '#6A9955' },
  'prolog': { color: '#6A9955' },
  'doctype': { color: '#6A9955' },
  'cdata': { color: '#6A9955' },
  'punctuation': { color: '#D4D4D4' },
  'namespace': { opacity: '.7' },
  'property': { color: '#9CDCFE' },
  'tag': { color: '#569CD6' },
  'boolean': { color: '#569CD6' },
  'number': { color: '#B5CEA8' },
  'constant': { color: '#9CDCFE' },
  'symbol': { color: '#9CDCFE' },
  'selector': { color: '#569CD6' },
  'attr-name': { color: '#9CDCFE' },
  'string': { color: '#CE9178' },
  'char': { color: '#9CDCFE' },
  'builtin': { color: '#569CD6' },
  'inserted': { color: '#B5CEA8', backgroundColor: '#144212' },
  'operator': { color: '#D4D4D4' },
  'entity': {
    cursor: 'help',
    backgroundColor: '#00000010',
  },
  'url': {
    color: '#9CDCFE',
  },
  '.language-css .token.string': {
    color: '#569CD6',
  },
  '.style .token.string': {
    color: '#569CD6',
  },
  'keyword': { color: '#569CD6' }
};

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch(blogPosts);
  
  const post = id ? getPostById(id) : undefined;
  
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
  };
  
  useEffect(() => {
    if (id && post) {
      console.log(`Viewed post: ${id}`);
      trackPageView(id);
    }
  }, [id, post]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      navigate('/');
    }
  };
  
  if (!post) {
    return (
      <Layout onSearch={handleSearch} className="bg-[#FCFBF8] dark:bg-[#0A0A0A]">
        <div className="container py-24 text-center bg-[#FCFBF8] dark:bg-[#0A0A0A]">
          <h1 className="text-4xl font-medium">Post Not Found</h1>
          <p className="mt-6 text-muted-foreground font-light text-lg">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="mt-12 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
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
    <Layout onSearch={handleSearch} className="bg-[#FCFBF8] dark:bg-[#0A0A0A]">
      <article className="animate-in bg-[#FCFBF8] dark:bg-[#0A0A0A]">
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">{title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-base text-muted-foreground font-light">
              <span>{author}</span>
              <span>·</span>
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
        
        <div className="prose-container py-16">
          <div className="blog-content font-light">
            <ReactMarkdown
              components={{
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  
                  if (match && match[1] === 'stl') {
                    return <StlViewer url={String(children).trim()} />;
                  }
                  
                  if (match && match[1] === 'python' && String(children).includes('plt.')) {
                    return <PyPlot code={String(children).trim()} />;
                  }
                  
                  return match ? (
                    <div className="relative group">
                      <button
                        onClick={() => handleCopyCode(String(children))}
                        className="absolute right-2 top-2 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-muted/50 hover:bg-muted"
                        aria-label="Copy code"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <SyntaxHighlighter
                        language={match[1]}
                        style={document.documentElement.classList.contains('dark') ? vsCodeDarkTheme : vsCodeLightTheme}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
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

          <div className="mt-16 border-t pt-8">
            <h3 className="text-xl font-medium mb-6">Share this post</h3>
            <ShareButtons url={window.location.href} title={title} />
          </div>

          <div className="mt-16 border-t pt-8">
            <Comments />
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Post;
