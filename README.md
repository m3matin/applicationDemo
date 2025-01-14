# applicationDemo

MERN Application Demo
This project is a full-stack MERN (MongoDB, Express.js, React, Node.js) application demonstrating user authentication, session management, and state handling. The application includes a login and registration system, token-based authentication, and a protected dashboard.

Backend
Authentication: User registration and login with hashed passwords.
Token-Based Authorization: Uses JSON Web Tokens (JWT) for secure API communication.
Validation: Input validation for forms and API endpoints using express-validator.
Middleware: Implements an authMiddleware to validate and authorize routes.
Database: MongoDB for data persistence.

backend can be satrt by cd backend and then use "npm run dev" that included nodemon

##########################################################################
Frontend
State Management: Redux is used to manage authentication and user state.
React Router: Implements navigation between pages (login, register, and dashboard).
UI Framework: React-Bootstrap is used for styling and responsive design.
Token Handling: Tokens are stored in localStorage for persistence and passed as Bearer tokens in API headers.

frontend can be satrt by cd frontend and then use "npm start"

##################################################################################
#.env for backend

MONGO_URI=mongodb://localhost:27017/applicationDemo
JWT_SECRET=applicationDemo13_01_2025
JWT_EXPIRY=1m
