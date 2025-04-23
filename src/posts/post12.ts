
import { BlogPost } from "@/utils/blogData";

// You can use <BarChartRaceDemo /> directly in markdown for a working chart in the blog!
const post: BlogPost = {
  id: "12",
  title: "Animated D3 Bar Chart Race (Live!) in your Blog",
  date: "2025-04-23",
  author: "Viz Example",
  excerpt:
    "How to embed a D3-powered bar chart race directly into your Markdown blog post, fully interactive.",
  content: `
# Live D3 Bar Chart Race Example

Below is a live, animated bar chart race using D3.js—**not just a code sample, but a real interactive chart!**

To integrate custom React+D3 visualizations inside your blog post:  
1. Insert a special component tag like this:

\`\`\`jsx
<BarChartRaceDemo />
\`\`\`

When your blog system sees this, it replaces it with a live D3 visualization!

---

## Example: Bar Chart Race

<BarChartRaceDemo />

**Enjoy your truly interactive technical blogging experience.**

---

### How it works

- The chart demo uses a fixed sample dataset.
- To use your own data, create a new component and supply your custom \`data\` prop.
- For more advanced integration, create distinct components per post and extend the markdown-to-react mapping.

  `,
  coverImage:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  tags: ["D3.js", "Data Visualization", "React", "Bar Chart Race", "Interactive"],
  views: 0,
};

export default post;
