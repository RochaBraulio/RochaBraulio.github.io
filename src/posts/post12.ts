
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "12",
  title: "Simple SVG Border Example",
  date: "2025-04-23",
  author: "Viz Example",
  excerpt: "A simple demonstration of an SVG with a gold border.",
  content: `
# SVG Border Demo

Here's a simple SVG with a gold border:

<Svg />

This is a basic example of rendering an SVG component directly in a blog post.

## Key Features

- Simple SVG rendering
- Gold border
- Minimal code

Try viewing the SVG below!

---
  `,
  coverImage:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  tags: ["SVG", "React", "Simple Component"],
  views: 0,
};

export default post;
