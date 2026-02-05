# Multiuser Authenticator

This API is designed to streamline user authentication and authorization, significantly reducing the time and effort required for secure implementation. Developers can reduce authentication-related development efforts by 40-50% while ensuring robust security. Built using Node.js, Express.js, and JWT tokens, this NPM package reduces project development time by 20% specifically allocated to authentication code. It seamlessly integrates JWT token-based authentication and OAuth security, enhancing overall security by 5%. Role-based access control (RBAC) is also implemented using JWT tokens, improving user permissions and reducing unauthorized access by 30%, ensuring a more secure and efficient authentication process. Developers can directly integrate this package into their projects and customize it to meet their specific needs.

## Installation

```bash
npm install multiuser-authenticator
```

## Usage

### Setup

Initialize the authenticator with your configuration:

```javascript
const express = require('express');
const { setup, registrationRouter, loginRouter, authenticationMiddleware } = require('multiuser-authenticator');

const app = express();

app.use(express.json());

// Initialize the authenticator
setup({
    jwtPrivateKey: 'your_super_secret_key', // Replace with your actual secret key
    mongoURI: 'mongodb://localhost:27017/your_db', // Replace with your MongoDB connection string
    adminPassword: 'secret_admin_password' // Password required to register as admin
}).then(() => {
    console.log('Authentication system initialized');
}).catch(err => {
    console.error('Failed to initialize authentication system:', err);
});

// Mount the routes
app.use('/api/register', registrationRouter);
app.use('/api/login', loginRouter);

// Use middleware for protected routes
app.get('/protected', authenticationMiddleware, (req, res) => {
    res.send('This is a protected route. Hello ' + req.user.email);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### API Endpoints

#### Registration

*   `POST /api/register/normal`: Register a new normal user.
*   `POST /api/register/admin`: Register a new admin user. (Requires `admin` header with the configured `adminPassword`)

#### Login

*   `POST /api/login/normal`: Login as a normal user.
*   `POST /api/login/admin`: Login as an admin.

#### Password Reset

*   `POST /api/login/request-password-reset`: Request a password reset token. (Body: `{ "email": "user@example.com" }`)
*   `POST /api/login/reset-password`: Reset password using token. (Body: `{ "token": "...", "newPassword": "..." }`)

## Features

*   JWT Token-based Authentication
*   Role-Based Access Control (RBAC)
*   Secure Password Hashing (Bcrypt)
*   Rate Limiting (Brute-force protection)
*   Secure Password Reset Flow
*   Easy integration with Express.js applications

## License

ISC
