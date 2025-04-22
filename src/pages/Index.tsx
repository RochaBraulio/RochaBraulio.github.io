
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";
import { blogPosts, getCategories } from "@/utils/blogData";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const POSTS_PER_PAGE = 5;

const Index = () => {
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "popularity">("date");
  const [showAllPosts, setShowAllPosts] = useState(false);
  const categories = getCategories();
  
  const { searchQuery, setSearchQuery, searchResults } = useSearch(blogPosts);
  
  const filteredPosts = filterTag
    ? searchResults.filter(post => post.tags.includes(filterTag))
    : searchResults;

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.views - a.views;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const displayedPosts = showAllPosts ? sortedPosts : sortedPosts.slice(0, POSTS_PER_PAGE);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) setFilterTag(null);
  };
  
  const handleTagFilter = (tag: string) => {
    if (filterTag === tag) {
      setFilterTag(null);
    } else {
      setFilterTag(tag);
      setSearchQuery('');
    }
  };

  return (
    <Layout onSearch={handleSearch} className="bg-[#FCFBF8] dark:bg-[#0A0A0A]">
      <section className="py-12 md:py-24 bg-[#FCFBF8] dark:bg-[#0A0A0A]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/3">
              <img
                src="/lovable-uploads/ea6e8f60-b633-456d-a6a2-37c0eaafef00.png"
                alt="Tree with bench illustration"
                className="
                  w-full h-auto
                  rounded-xl
                  shadow-lg
                  opacity-95
                  mix-blend-multiply
                  dark:opacity-90
                  dark:mix-blend-screen
                  transition-all duration-300
                  bg-transparent
                  "
                style={{
                  filter: "drop-shadow(0 8px 24px rgba(34,34,34,0.14)) blur(0.5px)",
                  background: "transparent"
                }}
              />
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                Data Analytics & 3D Printing Blog
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[700px] mb-8">
                Exploring the intersection of data science and 3D printing technology.
                Tutorials, guides, and insights to help you master both worlds.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-6 bg-[#FCFBF8] dark:bg-[#0A0A0A]">
        <div className="container max-w-6xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Categories</h2>
            <div className="flex items-center gap-4">
              <Select
                value={sortBy}
                onValueChange={(value: "date" | "popularity") => setSortBy(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Most Recent</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                </SelectContent>
              </Select>
              {filterTag && (
                <Button variant="ghost" onClick={() => setFilterTag(null)}>
                  Clear filter
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <Badge 
                key={category.name}
                variant={filterTag === category.name ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => handleTagFilter(category.name)}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-6 bg-[#FCFBF8] dark:bg-[#0A0A0A]">
        <div className="container max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : filterTag 
                ? `Posts in "${filterTag}"` 
                : "All Posts"}
          </h2>
          
          {displayedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found. Try a different search term or category.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {displayedPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
              
              {!showAllPosts && sortedPosts.length > POSTS_PER_PAGE && (
                <div className="mt-4 text-left">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAllPosts(true)}
                    className="min-w-[200px]"
                  >
                    Read More
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
