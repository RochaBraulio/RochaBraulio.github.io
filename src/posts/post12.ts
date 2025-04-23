
import { BlogPost } from "@/utils/blogData";
import { Svg } from "@/components/Svg";

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

Here's another SVG with a different border:

<Svg width={400} height={150} borderColor="purple" borderWidth={3} />

## Key Features

- Simple SVG rendering
- Custom border colors
- Custom dimensions
- Minimal code

Try viewing the SVGs above!

---
  `,
  coverImage:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  tags: ["SVG", "React", "Simple Component"],
  views: 0,
  components: { Svg }, // Add the components that will be used in this post
};

export default post;
