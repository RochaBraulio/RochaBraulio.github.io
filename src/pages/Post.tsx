
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDXProvider } from '@mdx-js/react';
import * as mdx from '@mdx-js/mdx';
import { Layout } from "@/components/Layout";
import { useSearch } from "@/hooks/useSearch";
import { blogPosts, getPostById, trackPageView } from "@/utils/blogData";
import { ShareButtons } from "@/components/ShareButtons";
import { Comments } from "@/components/Comments";
import { StlViewer } from "@/components/StlViewer";
import { PyPlot } from "@/components/PyPlot";
import { CodeBlock } from "@/components/CodeBlock";
import { PostHeader } from "@/components/PostHeader";
import { BarChartRace } from "@/components/BarChartRace";
import { LineChartDemo } from "@/components/LineChartDemo";
import { Svg } from "@/components/Svg";

// Default components that will be available in all MDX content
const defaultComponents = {
  Svg,
  StlViewer,
  PyPlot,
  LineChartDemo,
  BarChartRace,
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    
    // Handle STL file rendering
    if (match && match[1] === 'stl') {
      const stlUrl = String(children).trim();
      return <StlViewer url={stlUrl} />;
    }

    // Handle basic shapes
    if (match && match[1] === 'shape-cube') {
      return <StlViewer shape="cube" />;
    }

    if (match && match[1] === 'python' && String(children).includes('plt.')) {
      return <PyPlot code={String(children).trim()} />;
    }

    return match ? (
      <CodeBlock
        language={match[1]}
        value={String(children)}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

const demoData = [
  { name: "Alpha", value: 44, year: 2018 },
  { name: "Beta", value: 25, year: 2018 },
  { name: "Gamma", value: 36, year: 2018 },
  { name: "Alpha", value: 49, year: 2019 },
  { name: "Beta", value: 22, year: 2019 },
  { name: "Gamma", value: 40, year: 2019 },
  { name: "Alpha", value: 54, year: 2020 },
  { name: "Beta", value: 27, year: 2020 },
  { name: "Gamma", value: 42, year: 2020 },
];

interface MDXContentProps {
  content: string;
  components?: Record<string, React.ComponentType<any>>;
}

// Simplified MDXContent component to directly render custom components or markdown content
const MDXContent = ({ content, components = {} }: MDXContentProps) => {
  const [renderedContent, setRenderedContent] = React.useState<React.ReactNode>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Check for special content that should be handled differently
    if (content.includes("D3 Bar Chart Race")) {
      setRenderedContent(
        <div className="py-8">
          <h2 className="text-2xl font-medium mb-6">D3 Bar Chart Race Demo</h2>
          <BarChartRace data={demoData} width={600} height={350} />
        </div>
      );
      setIsLoading(false);
      return;
    }

    // For regular MDX content, use a simpler approach
    async function renderContent() {
      try {
        // Use a simple regex to identify component tags
        const componentRegex = /<(\w+)(?:\s+[^>]*)?(?:\/?>|>.*?<\/\1>)/g;
        const matches = [...content.matchAll(componentRegex)];
        
        // Check if we have any of our custom components in the content
        const hasCustomComponents = matches.some(match => {
          const componentName = match[1];
          return components[componentName] || defaultComponents[componentName];
        });
        
        if (hasCustomComponents) {
          // Manually render known components
          let processedContent = content;
          
          // Handle the BarChartRace component
          if (processedContent.includes("<BarChartRace")) {
            setRenderedContent(
              <div>
                {processMarkdown(processedContent)}
                <BarChartRace data={demoData} width={600} height={350} />
              </div>
            );
            setIsLoading(false);
            return;
          }
          
          // Handle the LineChartDemo component
          if (processedContent.includes("<LineChartDemo")) {
            setRenderedContent(
              <div>
                {processMarkdown(processedContent)}
                <LineChartDemo />
              </div>
            );
            setIsLoading(false);
            return;
          }
          
          // Handle the Svg component
          if (processedContent.includes("<Svg")) {
            setRenderedContent(
              <div>
                {processMarkdown(processedContent)}
                <Svg />
                <div className="mt-8">
                  <Svg width={400} height={150} borderColor="purple" borderWidth={3} />
                </div>
              </div>
            );
            setIsLoading(false);
            return;
          }
        }
        
        // For regular markdown without custom components
        setRenderedContent(processMarkdown(content));
        setIsLoading(false);
      } catch (error) {
        console.error("Error rendering MDX content:", error);
        setRenderedContent(<p>Error rendering content.</p>);
        setIsLoading(false);
      }
    }

    renderContent();
  }, [content, components]);

  // Simple markdown processing function
  const processMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    
    let currentParagraph: string[] = [];
    
    lines.forEach((line, index) => {
      // Handle headings
      if (line.startsWith('# ')) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`}>{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
        elements.push(<h1 key={`h1-${index}`} className="text-3xl font-bold mt-6 mb-4">{line.substring(2)}</h1>);
      } else if (line.startsWith('## ')) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`}>{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
        elements.push(<h2 key={`h2-${index}`} className="text-2xl font-semibold mt-6 mb-3">{line.substring(3)}</h2>);
      } else if (line.startsWith('### ')) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`}>{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
        elements.push(<h3 key={`h3-${index}`} className="text-xl font-medium mt-5 mb-2">{line.substring(4)}</h3>);
      } 
      // Handle code blocks
      else if (line.startsWith('```')) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`}>{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
        // We'll handle this very simply for now
        elements.push(<pre key={`pre-${index}`} className="bg-gray-100 dark:bg-gray-800 p-4 rounded my-4"><code>{line}</code></pre>);
      }
      // Handle empty lines as paragraph breaks
      else if (line.trim() === '') {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`} className="mb-4">{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
      } 
      // Handle list items
      else if (line.trim().startsWith('- ')) {
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${index}`}>{currentParagraph.join(' ')}</p>);
          currentParagraph = [];
        }
        elements.push(<li key={`li-${index}`} className="ml-6 list-disc">{line.trim().substring(2)}</li>);
      }
      // Handle normal text
      else {
        currentParagraph.push(line);
      }
    });
    
    // Add any remaining paragraph text
    if (currentParagraph.length > 0) {
      elements.push(<p key="final-p" className="mb-4">{currentParagraph.join(' ')}</p>);
    }
    
    return <div className="markdown-content">{elements}</div>;
  };

  if (isLoading) {
    return <div>Loading content...</div>;
  }

  return <>{renderedContent}</>;
};

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch(blogPosts);

  const post = id ? getPostById(id) : undefined;

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

  // Combine the default components with any post-specific components
  const mdxComponents = { ...defaultComponents, ...(post.components || {}) };

  return (
    <Layout onSearch={handleSearch} className="bg-[#FCFBF8] dark:bg-[#0A0A0A]">
      <article className="animate-in bg-[#FCFBF8] dark:bg-[#0A0A0A]">
        <PostHeader {...post} />

        <div className="prose-container py-16">
          <div className="blog-content font-light">
            <MDXContent content={post.content} components={mdxComponents} />
          </div>

          <div className="mt-16 border-t pt-8">
            <h3 className="text-xl font-medium mb-6">Share this post</h3>
            <ShareButtons url={window.location.href} title={post.title} />
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
