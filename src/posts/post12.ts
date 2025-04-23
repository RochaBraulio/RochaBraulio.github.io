
import { BlogPost } from "@/utils/blogData";

// Use <LineChartDemo /> directly in markdown for a working chart in the blog!
const post: BlogPost = {
  id: "12",
  title: "Live D3 Line Chart Example in Your Blog Post",
  date: "2025-04-23",
  author: "Viz Example",
  excerpt:
    "See an interactive D3-powered line chart rendered directly in your Markdown blog post, no code required.",
  content: `
# D3.js Line Chart Demo

Below is a live, interactive line chart powered by D3.js.

<LineChartDemo />

**This chart is interactive and updates based on the underlying data.**

---
  `,
  coverImage:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  tags: ["D3.js", "Data Visualization", "React", "Line Chart", "Interactive"],
  views: 0,
};

export default post;
