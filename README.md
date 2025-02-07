# Bot Calculator Backend

## Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB & Mongoose**
- **JWT for authentication**
- **Bcrypt for password hashing**
- **Swagger for API documentation**

## Installation

1. Navigate to the frontend directory:    
    ### `cd gcp-backend`

2. Install dependencies:
    ###  `npm install`

3. Start the development server:
    ###  `npm run dev`

The server will run at [http://localhost:3000](http://localhost:3000)

## Set Up Env Variables
PORT=3000
JWT_SECRET=my_super_secret_key

## API Endpoints

1. POST /api/auth/login: Login & get a JWT token.
2. GET /api/auth/protected: Access protected data (Requires authentication).


## API Authentication Flow

1. User logs in with email & password.
2. Backend checks if the user exists, if not, creates one.
3. Passwords are hashed before storing in the database.
4. Backend issues a JWT token upon successful authentication.
5. The token is used to access protected routes.

## Middleware

verifyJWT.ts: Ensures users are authenticated before accessing protected routes.



## Scripts

###  `npm run dev`  Starts the development server.


## Notes

1. Ensure MongoDB is running locally.
2. Command to generate random key: 
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" 
    output e.g.: 394d2be2088a8246573503d6268788bf6a3e629309a256b963254ea530db34a4
3. To access Auth API Documentation go to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

