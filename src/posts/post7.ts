
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "7",
  title: "Responsive Web Design Principles",
  date: "2024-10-18",
  excerpt: "Learn the key principles of responsive web design to create sites that work on any device.",
  content: `
# Responsive Web Design Principles

Responsive web design ensures your website looks good on all devices, from desktop computers to mobile phones.

## Fluid Layouts

Fluid layouts use relative units instead of fixed units:

\`\`\`css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.column {
  width: 50%;
  float: left;
  padding: 0 15px;
}

@media (max-width: 768px) {
  .column {
    width: 100%;
    float: none;
  }
}
\`\`\`

## Media Queries

Media queries adapt your design to different screen sizes:

\`\`\`css
/* Base styles for all devices */
body {
  font-size: 16px;
}

/* Styles for tablets */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
  .sidebar {
    display: none;
  }
}

/* Styles for mobile phones */
@media (max-width: 480px) {
  body {
    font-size: 12px;
  }
  .header {
    text-align: center;
  }
}
\`\`\`

## Responsive Images

Make images responsive to fit different screen sizes:

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

For modern browsers, use the picture element:

\`\`\`html
<picture>
  <source srcset="img-large.jpg" media="(min-width: 1200px)">
  <source srcset="img-medium.jpg" media="(min-width: 768px)">
  <img src="img-small.jpg" alt="Responsive image">
</picture>
\`\`\`

## Flexible Typography

Use relative units for typography to scale across devices:

\`\`\`css
body {
  font-size: 100%;
}

h1 {
  font-size: 2.5em;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2em;
  }
}
\`\`\`

Or try modern CSS with clamp():

\`\`\`css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
\`\`\`

## Mobile-First Approach

Start by designing for mobile devices and then enhance for larger screens:

\`\`\`css
/* Base styles for mobile */
.navigation {
  display: flex;
  flex-direction: column;
}

/* Enhance for larger screens */
@media (min-width: 768px) {
  .navigation {
    flex-direction: row;
    justify-content: space-between;
  }
}
\`\`\`

By following these principles, you'll create websites that provide an optimal experience across all devices.
  `,
  coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  tags: ["CSS", "Responsive Design", "Web Development"]
};

export default post;
