import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const nodeJsSections = [
  {
    heading: "What is Node.js?",
    content: `Node.js is a runtime environment built on Chrome's V8 JavaScript engine. It enables running JavaScript on the server, allowing full-stack development with JavaScript.`
  },
  {
    heading: "Key Features",
    content: `• Non-blocking, event-driven architecture
• Uses JavaScript on the server-side
• Built-in modules (fs, http, path, etc.)
• NPM for package management
• Cross-platform support
• Scalable for network applications`
  },
  {
    heading: "Setting Up Node.js",
    code: `# Check Node.js version
node -v

# Check npm version
npm -v

# Initialize a new project
npm init -y` 
  },
  {
    heading: "Creating a Simple Server",
    code: `const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`
  },
  {
    heading: "Using Express.js",
    code: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express');
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});`
  },
  {
    heading: "File System Module (fs)",
    code: `const fs = require('fs');

// Read file
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Write file
fs.writeFile('file.txt', 'Hello Node.js', err => {
  if (err) throw err;
  console.log('File written');
});`
  },
  {
    heading: "Working with Modules",
    code: `// myModule.js
module.exports = function() {
  console.log('Hello from module');
};

// app.js
const myModule = require('./myModule');
myModule();`
  },
  {
    heading: "Environment Variables",
    code: `// .env
PORT=4000

// app.js
require('dotenv').config();
console.log(process.env.PORT);`
  },
  {
    heading: "Package Management",
    content: `• npm install <package>
• npm install --save-dev <package>
• npm uninstall <package>
• List packages: npm list --depth=0`
  },
  {
    heading: "Best Practices",
    content: `• Use async/await for asynchronous code
• Modularize code using CommonJS or ES modules
• Handle errors gracefully
• Use environment variables for configuration
• Validate user input and sanitize data
• Follow security practices (e.g., Helmet, CORS)`
  },
  {
    heading: "Common Use Cases",
    content: `• Building RESTful APIs
• Real-time applications with WebSocket (e.g., chat apps)
• Command-line tools
• Scripting and automation
• Backend for web and mobile apps
• Microservices and serverless functions`
  }
];

const NodeJsCheatSheet = () => {
  return (
    <CheatSheetLayout
    language='javascript'
      title="Node.js Cheat Sheet"
      description="Essential guide for building backend applications with Node.js."
      sections={nodeJsSections}
      cheatsheetId={22}
    />
  );
};

export default NodeJsCheatSheet;