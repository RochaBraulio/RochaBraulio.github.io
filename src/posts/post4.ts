
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "4",
  title: "Understanding CSS Grid Layout",
  date: "2024-07-22",
  excerpt: "Master CSS Grid Layout for modern web design with this comprehensive guide.",
  content: `
# Understanding CSS Grid Layout

CSS Grid Layout is a two-dimensional layout system designed for the web, allowing us to create complex responsive web layouts more easily.

## Basic Terminology

- Grid Container: The element with `display: grid` applied.
- Grid Item: The direct children of the grid container.
- Grid Line: The dividing lines that make up the grid structure.
- Grid Track: The space between two adjacent grid lines (rows or columns).
- Grid Cell: The intersection of a row and a column.
- Grid Area: The total space surrounded by four grid lines.

## Creating a Simple Grid

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 200px 200px;
  grid-template-rows: 100px 100px;
  gap: 10px;
}
\`\`\`

## The FR Unit

The fr unit represents a fraction of the available space:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 10px;
}
\`\`\`

## Grid Areas

Grid areas allow you to name specific areas of your grid:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "sidebar main main main"
    "footer footer footer footer";
  gap: 10px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## Auto-Fill and Auto-Fit

Create flexible layouts that adjust based on viewport size:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}
\`\`\`

CSS Grid is now well-supported across modern browsers, making it an excellent choice for layout design.
`,
  coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2",
  tags: ["CSS", "Web Design", "Frontend"]
};

export default post;
