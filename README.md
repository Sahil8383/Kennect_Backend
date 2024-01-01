# Backend API Documentation

This repository contains the backend code for your application. It is built using Node.js and Express to handle API requests related to user authentication and post management.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
2. Run the server:

   ```bash
   npm start

# API Endpoints

## User Routes

- `POST /signup`: Create a new user account.
- `POST /login`: Log in with existing user credentials.
- `POST /myPosts`: Get posts associated with the logged-in user.

## Post Routes

- `GET /posts`: Get all posts.
- `POST /posts`: Create a new post.
- `PATCH /posts`: Add comments to a post.
- `GET /commentsData/:id`: Get comments for a specific post.
- `GET /searchedPosts`: Search for posts.
- `GET /post/:id`: Get details of a single post.

# Controllers

- **UserController**: Handles user-related actions like signup, login, and getting user posts.
- **PostsController**: Manages actions related to posts, such as creating posts, adding comments, retrieving all posts, and more.
