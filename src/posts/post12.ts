
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "12",
  title: "Live D3 Line Chart Example in Your Blog Post",
  date: "2025-04-23",
  author: "Viz Example",
  excerpt:
    "See an interactive D3-powered line chart rendered directly in your Markdown blog post, no code required.",
  content: `
# D3.js Line Chart Demo

Below is a live, interactive line chart powered by D3.js. The chart shows yearly data trends from 2015 to 2021.

<LineChartDemo />

**This chart is interactive and updates based on the underlying data.**

## How It Works

This chart is rendered directly in your Markdown content using a custom React component. The syntax is simple:

\`\`\`markdown
<LineChartDemo />
\`\`\`

The component handles all the D3 setup and rendering, making it easy to include interactive data visualizations in your blog posts.

## Key Features

- **Simple Integration**: Just add the component tag in your Markdown
- **Interactive Elements**: Hover over data points for more information
- **Responsive Design**: Adapts to different screen sizes
- **Custom Styling**: Matches your blog's visual theme

Try hovering over the data points to see the values!

---
  `,
  coverImage:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  tags: ["D3.js", "Data Visualization", "React", "Line Chart", "Interactive"],
  views: 0,
};

export default post;
