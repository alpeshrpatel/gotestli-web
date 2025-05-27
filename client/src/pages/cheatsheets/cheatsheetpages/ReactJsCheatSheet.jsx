import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const reactJsSections = [
  {
    heading: "What is React?",
    content: `React is a JavaScript library for building user interfaces, maintained by Meta (Facebook) and a community of developers. It allows developers to create large web applications that can update and render efficiently in response to data changes.`
  },
  {
    heading: "Core Concepts",
    content: `• Components: Reusable pieces of UI, either class-based or functional
• JSX: JavaScript syntax extension that looks like HTML
• Props: Read-only attributes used to pass data to components
• State: Managed within components for dynamic data
• Lifecycle Methods (class components) and Hooks (functional components)
• Virtual DOM: Lightweight copy of the actual DOM for efficient rendering`
  },
  {
    heading: "Creating a React App",
    code: `# Using Create React App
npx create-react-app my-app
cd my-app
npm start`
  },
  {
    heading: "JSX Syntax",
    content: `• Looks like HTML but it's JavaScript
• Must return a single root element
• Use "className" instead of "class"
• Use curly braces for JavaScript expressions
• Components must be capitalized`
  },
  {
    heading: "State and Props",
    content: `• Props are passed to components like HTML attributes: <Component name=\"John\" />
• State is managed using useState hook in functional components:
  const [count, setCount] = useState(0);`
  },
  {
    heading: "Hooks",
    content: `• useState: Manage local state
• useEffect: Handle side effects like data fetching
• useContext: Access global context
• useRef: Reference DOM nodes or keep mutable values
• useReducer: Advanced state management`
  },
  {
    heading: "Component Lifecycle",
    content: `• Mounting: constructor → render → componentDidMount
• Updating: shouldComponentUpdate → render → componentDidUpdate
• Unmounting: componentWillUnmount
• In functional components, useEffect can simulate lifecycle behavior`
  },
  {
    heading: "React Router (Routing)",
    content: `• Enables navigation among views
• Basic setup:`,
code:`
  import { BrowserRouter, Route, Routes } from 'react-router-dom';
  
  <BrowserRouter>
    <Routes>
      <Route path=\"/\" element={<Home />} />
      <Route path=\"/about\" element={<About />} />
    </Routes>
  </BrowserRouter>`
  },
  {
    heading: "State Management",
    content: `• Local State: useState or useReducer
• Context API: For lightweight global state
• Redux / Zustand / Jotai / Recoil: For complex or large-scale state needs`
  },
  {
    heading: "Best Practices",
    content: `• Keep components small and focused
• Use functional components and hooks
• Avoid prop drilling with Context
• Separate concerns (logic vs UI)
• Use error boundaries to catch rendering errors`
  },
  {
    heading: "Common Use Cases",
    content: `• Building SPAs and PWAs
• Dashboards and admin panels
• Real-time apps using sockets
• Mobile apps with React Native
• Static site generation (with Gatsby or Next.js)`
  }
];

const ReactJsCheatSheet = () => {
  return (
    <CheatSheetLayout
      language="javascript"
      title="React.js Cheat Sheet"
      description="Comprehensive guide and reference for React.js in modern web development."
      sections={reactJsSections}
    />
  );
};

export default ReactJsCheatSheet;
