import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const expressJsSections = [
  {
    heading: "What is Express.js?",
    content: `Express.js is a minimal and flexible Node.js web application framework that provides robust features to build web and mobile applications. It is widely used for building RESTful APIs and web servers.`
  },
  {
    heading: "Key Features",
    content: `• Minimalist framework with powerful routing
• Middleware support for request handling
• Integration with databases
• Template engine support
• Built-in HTTP utility methods
• Easy to set up RESTful APIs`
  },
  {
    heading: "Setting Up Express.js",
    code: `# Create a new project
mkdir express-app && cd express-app
npm init -y

# Install Express
npm install express`
  },
  {
    heading: "Basic Server Setup",
    code: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`
  },
  {
    heading: "Routing",
    code: `app.get('/about', (req, res) => {
  res.send('About Page');
});

app.post('/submit', (req, res) => {
  res.send('Data Submitted');
});`
  },
  {
    heading: "Middleware",
    code: `app.use(express.json());

app.use((req, res, next) => {
  console.log(\`\${req.method} request to \${req.url}\`);
  next();
});`
  },
  {
    heading: "Serving Static Files",
    code: `app.use(express.static('public'));

// Now files in the "public" folder are accessible via the root URL`
  },
  {
    heading: "Handling Parameters",
    code: `app.get('/user/:id', (req, res) => {
  res.send(\`User ID: \${req.params.id}\`);
});`
  },
  {
    heading: "Using Template Engines",
    code: `app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});`
  },
  {
    heading: "Connecting to a Database",
    content: `• Use libraries like Mongoose for MongoDB or Sequelize for SQL databases
• Typically done in a separate file and required into your app`
  },
  {
    heading: "Error Handling",
    code: `app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});`
  },
  {
    heading: "Best Practices",
    content: `• Use environment variables for config
• Keep routes in separate files
• Validate inputs with libraries like Joi
• Handle async errors properly
• Use helmet for securing HTTP headers
• Use morgan for logging requests`
  },
  {
    heading: "Common Use Cases",
    content: `• Building RESTful APIs
• Web applications and dashboards
• Backend for mobile apps
• Real-time chat applications (with Socket.IO)
• Authentication and user management systems`
  }
];

const ExpressJsCheatSheet = () => {
  return (
    <CheatSheetLayout
    language='javascript'
      title="Express.js Cheat Sheet"
      description="A concise and comprehensive guide for building web servers and APIs with Express.js."
      sections={expressJsSections}
    />
  );
};

export default ExpressJsCheatSheet;
