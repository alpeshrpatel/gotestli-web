import React from 'react';
import CheatSheetLayout from '../CheatSheetLayout';

const fastapiSections = [
  {
    heading: "What is FastAPI?",
    content: `FastAPI is a modern, high-performance web framework for building APIs with Python 3.7+ based on standard Python type hints. It's designed for speed and ease of use, leveraging asynchronous programming.`
  },
  {
    heading: "Key Features",
    content: `• Fast performance, comparable to NodeJS and Go
• Automatic interactive API docs with Swagger and ReDoc
• Dependency injection system
• Data validation and serialization using Pydantic
• Supports OAuth2, JWT, and other security schemes
• Async support out of the box`
  },
  {
    heading: "Setting Up FastAPI",
    code: `# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install FastAPI and Uvicorn
pip install fastapi uvicorn`
  },
  {
    heading: "Basic App Setup",
    code: `from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def read_root():
    return {"Hello": "World"}

# Run the server
# uvicorn main:app --reload`
  },
  {
    heading: "Path and Query Parameters",
    code: `@app.get('/items/{item_id}')
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}`
  },
  {
    heading: "Request Body and Pydantic Models",
    code: `from pydantic import BaseModel

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post('/items/')
def create_item(item: Item):
    return item`
  },
  {
    heading: "Response Models",
    code: `from pydantic import BaseModel

class ItemOut(BaseModel):
    name: str
    price: float

@app.get('/items/{item_id}', response_model=ItemOut)
def get_item(item_id: int):
    return {"name": "Sample Item", "price": 25.0}`
  },
  {
    heading: "Dependency Injection",
    code: `from fastapi import Depends

def common_parameters(q: str = None):
    return q

@app.get('/search/')
def search_items(q: str = Depends(common_parameters)):
    return {"query": q}`
  },
  {
    heading: "Middleware and CORS",
    code: `from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`
  },
  {
    heading: "Authentication and Security",
    code: `from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get('/users/me')
def read_users_me(token: str = Depends(oauth2_scheme)):
    return {"token": token}`
  },
  {
    heading: "Best Practices",
    content: `• Use Pydantic for data validation
• Document your API with docstrings and annotations
• Use dependency injection for clean code
• Organize large apps using routers
• Validate security and authentication
• Run in production with Uvicorn or Gunicorn with Uvicorn workers`
  },
  {
    heading: "Common Use Cases",
    content: `• REST APIs
• Async web services
• Microservices and backend APIs
• ML model serving
• Replacing Flask or Django REST Framework for high-performance APIs`
  }
];

const FastApiCheatSheet = () => {
  return (
    <CheatSheetLayout
      title="FastAPI Framework Cheat Sheet"
      description="A comprehensive guide for building high-performance APIs using FastAPI."
      sections={fastapiSections}
      cheatsheetId={16}
    />
  );
};

export default FastApiCheatSheet;
