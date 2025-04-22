
import { useState, useEffect, useMemo } from 'react';
import { BlogPost } from '@/utils/blogData';

export const useSearch = (posts: BlogPost[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BlogPost[]>([]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const query = searchQuery.toLowerCase();
    return posts.filter(post => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });
  }, [posts, searchQuery]);

  useEffect(() => {
    setSearchResults(filteredPosts);
  }, [filteredPosts]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
  };
};
