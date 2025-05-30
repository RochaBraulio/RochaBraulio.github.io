
import { getCloudinaryUrl } from "./cloudinary";
import { allPosts } from "../posts";

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  components?: Record<string, React.ComponentType<any>>;
}

export const blogPosts = allPosts;

export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getRecentPosts = (): BlogPost[] => {
  return [...blogPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 3);
};

export const getCategories = (): { name: string; count: number }[] => {
  const categoryMap = new Map<string, number>();
  
  blogPosts.forEach(post => {
    post.tags.forEach(tag => {
      categoryMap.set(tag, (categoryMap.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));
};

// Added dummy function to fix import in Post.tsx
export const trackPageView = (id: string): void => {
  // This function is a placeholder since view tracking was removed
  console.log(`Post ${id} viewed`);
};
