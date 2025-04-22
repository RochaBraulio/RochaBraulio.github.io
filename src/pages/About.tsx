
import { Layout } from "@/components/Layout";
import { useSearch } from "@/hooks/useSearch";
import { blogPosts } from "@/utils/blogData";

const About = () => {
  const { searchQuery, setSearchQuery } = useSearch(blogPosts);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Layout 
      onSearch={handleSearch} 
      className="bg-[#FCFBF8] dark:bg-[#0A0A0A]"
    >
      <div className="container py-12 bg-[#FCFBF8] dark:bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-6">About This Blog</h1>
          
          <div className="prose dark:prose-invert">
            <p>
              Welcome to my personal blog focusing on data analytics and 3D printing. This platform serves as both my digital garden and a place to share knowledge with the community.
            </p>
            
            <h2>What I Write About</h2>
            <ul>
              <li><strong>Data Analytics:</strong> From basic tutorials to advanced techniques, I explore the world of data science, visualization, and insights.</li>
              <li><strong>3D Printing:</strong> Technical guides, troubleshooting tips, and creative projects that showcase the potential of additive manufacturing.</li>
              <li><strong>Where They Intersect:</strong> The fascinating space where data and physical creation meet, including data-driven design, optimization, and more.</li>
            </ul>
            
            <h2>Technical Details</h2>
            <p>
              This blog is built using modern web technologies:
            </p>
            <ul>
              <li>React for the frontend framework</li>
              <li>Tailwind CSS for styling</li>
              <li>GitHub Pages for hosting</li>
              <li>Markdown for content</li>
            </ul>
            
            <h2>Contact</h2>
            <p>
              Have a question or want to connect? Feel free to reach out through any of the following channels:
            </p>
            <ul>
              <li>Email: <a href="mailto:your.email@example.com">your.email@example.com</a></li>
              <li>GitHub: <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">@yourusername</a></li>
              <li>Twitter: <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">@yourusername</a></li>
            </ul>
            
            <h2>Licensing</h2>
            <p>
              Unless otherwise noted, all content on this blog is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
            </p>
            <p>
              Code snippets are licensed under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
