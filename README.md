# TaskManagementApp
## Architecture

┌─────────────────┐         REST                  ┌─────────────────┐
│                 │◄─────────────────────────────►│                 │
│  React Frontend │                               │  Node.js Backend│
│                 │                               │  (Express)      │
└─────────────────┘                               └────────┬────────┘
                                                           │
                                                           │ MySQL Protocol
                                                           ▼
                                                    ┌──────────────┐
                                                    │   MySQL      │
                                                    │   Database   │
                                                    └──────────────┘

## Components & Flow:
### Frontend (React):

React handles the UI and sends requests (via axios or fetch) to the backend.
The frontend is built with components that manage state and render content dynamically.

### Backend (Node.js/Express):

The Node.js backend receives HTTP requests (via Express routes), processes them, and interacts with the database.
Authentication logic might be implemented (JWT tokens or sessions).
The server sends back responses (e.g., JSON) to the React frontend.

### Database (MySQL):

MySQL stores and retrieves data for the backend via SQL queries.
The Node.js server communicates with MySQL using a MySQL client or ORM (Sequelize, TypeORM, etc.).
