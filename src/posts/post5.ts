
import { BlogPost } from "@/utils/blogData";

const post: BlogPost = {
  id: "5",
  title: "Introduction to TypeScript",
  date: "2024-08-05",
  excerpt: "Learn why TypeScript is becoming the preferred language for web development.",
  content: `
# Introduction to TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Why TypeScript?

TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications. TypeScript compiles to readable, standards-based JavaScript.

## Getting Started

First, install TypeScript:

\`\`\`bash
npm install -g typescript
\`\`\`

Then, create a simple TypeScript file:

\`\`\`typescript
// greeter.ts
function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Jane User";
document.body.textContent = greeter(user);
\`\`\`

Compile it to JavaScript:

\`\`\`bash
tsc greeter.ts
\`\`\`

## Interfaces in TypeScript

TypeScript's interfaces allow you to define the shape of objects:

\`\`\`typescript
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };
document.body.textContent = greeter(user);
\`\`\`

## Classes in TypeScript

TypeScript supports the latest JavaScript features like classes:

\`\`\`typescript
class Student {
  fullName: string;
  
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");
document.body.textContent = greeter(user);
\`\`\`

TypeScript helps you catch errors before runtime, making development more efficient.
  `,
  coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  tags: ["TypeScript", "JavaScript", "Programming"]
};

export default post;
