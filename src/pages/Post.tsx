
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

    if (match && match[1] === 'stl') {
      return <StlViewer url={String(children).trim()} />;
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

// Fixed MDXContent component to properly handle MDX content
const MDXContent = ({ content, components = {} }: MDXContentProps) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    async function compileMdx() {
      try {
        // Compile the MDX content
        const compiledMdx = await mdx.compile(content, { outputFormat: 'function-body' });
        
        // Convert the compiled MDX to a string
        const code = String(compiledMdx);
        
        // Create a function that returns a component
        // Using a more direct approach to avoid object issues
        const fn = new Function('React', 'components', `
          ${code}
          return function MDXScope(props) {
            return React.createElement(MDXContent, Object.assign({}, props, { components }));
          }
        `);
        
        // Create the component with proper React and components context
        const MDXComponent = fn(React, components);
        setComponent(() => MDXComponent);
      } catch (error) {
        console.error("Error compiling MDX:", error);
      }
    }

    compileMdx();
  }, [content, components]);

  // Special handling for post #11 with the D3 Bar Chart Race
  if (content.includes("D3 Bar Chart Race") && !Component) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-medium mb-6">D3 Bar Chart Race Demo</h2>
        <BarChartRace data={demoData} width={600} height={350} />
      </div>
    );
  }

  return Component ? (
    <MDXProvider components={components}>
      <Component />
    </MDXProvider>
  ) : (
    <div>Loading content...</div>
  );
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
