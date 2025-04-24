
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "2",
  title: "Getting Started with React Hooks",
  date: "2024-05-15",
  excerpt: "Learn how to use React Hooks to simplify your functional components.",
  content: `
# Getting Started with React Hooks

React Hooks have revolutionized how we write React components. With hooks, you can use state and other React features without writing a class.

## What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. React provides a few built-in Hooks like useState, useEffect, and useContext.

## The useState Hook

The useState hook lets you add state to functional components.

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## The useEffect Hook

The useEffect hook lets you perform side effects in function components:

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

Start incorporating hooks into your React projects today!
  `,
  coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
  tags: ["React", "JavaScript", "Frontend"]
};

export default post;
