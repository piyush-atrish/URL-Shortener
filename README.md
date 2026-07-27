# Production-Ready URL Shortener 🔗

A highly scalable, maintainable, and modular URL Shortener built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project goes beyond basic CRUD operations by implementing industry-standard best practices, modular folder structures, and advanced system design concepts.

Based on the tutorial by [Sheryians Coding School](https://youtu.be/ENmBjeLImt4).

## 🚀 Features

*   **URL Shortening:** Convert long, bulky URLs into clean, short links using `nanoid`.
*   **Link Redirection:** Seamlessly redirect users from the short URL to the original destination.
*   **Custom URLs (Slugs):** Allow authenticated users to create their own custom aliases (e.g., `yoursite.com/my-custom-link`).
*   **User Authentication:** Secure Sign-Up and Sign-In using JWT (JSON Web Tokens) stored securely in HTTP-only cookies.
*   **Analytics (Click Tracking):** Keep track of how many times a shortened URL has been clicked.
*   **User Dashboard:** A dedicated space for authenticated users to view and manage all their created links.

## 🛠️ Tech Stack

**Frontend:**
*   React.js (Vite)
*   Tailwind CSS (Styling)
*   TanStack Router (Modern, type-safe routing)
*   Redux Toolkit (State management)
*   Axios (API requests with interceptors)

**Backend:**
*   Node.js & Express.js
*   MongoDB & Mongoose (Database & ODM)
*   NanoID (Generating unique short IDs)
*   Bcrypt (Password hashing)
*   JSONWebToken & Cookie-Parser (Stateless Authentication)

## 📁 Architecture & Folder Structure

This project completely avoids the "everything in `app.js`" approach. It implements a **Modular/Feature-based Architecture** separating concerns effectively:

```text
backend/
├── src/
│   ├── config/          # Database connection, Environment variables
│   ├── controllers/     # Business logic (e.g., auth.controller.js)
│   ├── dao/             # Data Access Object (Direct DB queries)
│   ├── middlewares/     # Auth checks, error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API route definitions
│   ├── services/        # Reusable services (e.g., generate URL, sign token)
│   └── utils/           # Helper functions (Try-catch wrapper, etc.)
└── app.js               # Entry point
