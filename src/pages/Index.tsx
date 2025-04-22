
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/hooks/useSearch";
import { blogPosts, getCategories } from "@/utils/blogData";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "popularity">("date");
  const categories = getCategories();
  
  const { searchQuery, setSearchQuery, searchResults } = useSearch(blogPosts);
  
  const filteredPosts = filterTag
    ? searchResults.filter(post => post.tags.includes(filterTag))
    : searchResults;

  // Sort posts based on selected criteria
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.views - a.views;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
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
    <Layout onSearch={handleSearch}>
      <section className="py-12 md:py-24 bg-gradient-to-b from-primary/10 to-background">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Data Analytics & 3D Printing Blog
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-[700px] mb-8">
            Exploring the intersection of data science and 3D printing technology.
            Tutorials, guides, and insights to help you master both worlds.
          </p>
        </div>
      </section>
      
      <section className="py-6">
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
      
      <section className="py-6">
        <div className="container max-w-6xl">
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : filterTag 
                ? `Posts in "${filterTag}"` 
                : "All Posts"}
          </h2>
          
          {sortedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found. Try a different search term or category.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Index;

