
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MDXProvider } from '@mdx-js/react';
import { compile } from '@mdx-js/mdx';
import { runSync } from '@mdx-js/mdx/run';

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

const MDXContent = ({ content, components = {} }) => {
  const [Component, setComponent] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    async function compileMdx() {
      try {
        const compiledMdx = await compile(content, { outputFormat: 'function-body' });
        const { default: MdxContent } = await runSync(String(compiledMdx), { ...components });
        setComponent(() => MdxContent);
      } catch (error) {
        console.error("Error compiling MDX:", error);
      }
    }

    compileMdx();
  }, [content, components]);

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
