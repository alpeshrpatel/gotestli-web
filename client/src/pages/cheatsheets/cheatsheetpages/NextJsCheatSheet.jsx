import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const nextJsSections = [
  {
    heading: "What is Next.js?",
    content: `Next.js is a popular React framework for building fast, user-friendly web applications. It offers hybrid static and server-side rendering, file-based routing, API routes, and full TypeScript support.`
  },
  {
    heading: "Key Features",
    content: `• File-based routing system
• Pre-rendering (Static Generation and Server-side Rendering)
• Built-in API routes
• Image optimization
• CSS and Sass support, CSS-in-JS
• Fast refresh for development
• TypeScript support
• Middleware for edge functions`
  },
  {
    heading: "Setting Up a Project",
    code: `# Create a new Next.js app
npx create-next-app@latest my-app
# or with TypeScript
npx create-next-app@latest my-app --typescript

cd my-app
npm run dev` 
  },
  {
    heading: "Pages and Routing",
    code: `// pages/index.js
export default function Home() {
  return <h1>Home Page</h1>;
}

// pages/about.js
export default function About() {
  return <h1>About Page</h1>;
}`
  },
  {
    heading: "Linking Between Pages",
    code: `import Link from 'next/link';

<Link href="/about">About</Link>`
  },
  {
    heading: "Static Generation (getStaticProps)",
    code: `export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}`
  },
  {
    heading: "Server-side Rendering (getServerSideProps)",
    code: `export async function getServerSideProps(context) {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}`
  },
  {
    heading: "Dynamic Routes",
    code: `// pages/posts/[id].js
import { useRouter } from 'next/router';

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  return <p>Post ID: {id}</p>;
}`
  },
  {
    heading: "API Routes",
    code: `// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API' });
}`
  },
  {
    heading: "Styling",
    content: `• Global CSS: Import in _app.js
• Component-level CSS Modules
• Sass support out of the box
• CSS-in-JS with styled-components or emotion`
  },
  {
    heading: "Image Optimization",
    code: `import Image from 'next/image';

<Image src="/logo.png" alt="Logo" width={200} height={100} />`
  },
  {
    heading: "Deployment",
    content: `• Vercel (native support for Next.js)
• Static export for fully static apps
• Supports Node.js server deployment on platforms like AWS, DigitalOcean, Heroku`
  },
  {
    heading: "Best Practices",
    content: `• Use Static Generation where possible
• Keep API routes thin and fast
• Use getServerSideProps only when dynamic data is needed
• Use TypeScript for better maintainability
• Optimize images using <Image> component
• Structure large projects with modular folders`
  },
  {
    heading: "Common Use Cases",
    content: `• Static sites with dynamic capabilities
• SEO-friendly blogs and documentation
• E-commerce websites
• Dashboards with real-time data
• Hybrid apps (static + dynamic)
• JAMstack architectures`
  }
];

const NextJsCheatSheet = () => {
  return (
    <CheatSheetLayout
    language='javascript'
      title="Next.js Cheat Sheet"
      description="Complete reference for building modern web applications with Next.js."
      sections={nextJsSections}
    />
  );
};

export default NextJsCheatSheet;
