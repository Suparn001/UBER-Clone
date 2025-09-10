# User Registration Endpoint Documentation

## Endpoint
`POST /users/register`

## Description
This endpoint registers a new user by accepting their details, creating a user record, and returning an authentication token. It is defined in the [user.routes.js](Backend/routes/user.routes.js) and handled by [user.controller.js](Backend/controller/user.controller.js).

## Request Data
The endpoint expects a JSON payload with the following structure:

- **fullName** (object):
  - **firstName**: String (Required, minimum 3 characters)
  - **lastName**: String (Optional, minimum 3 characters if provided)
- **email**: String (Required, must be a valid email address)
- **password**: String (Required, minimum 8 characters)

**Example Request Body:**
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Example Response:**
```json
{
    "success": true,
    "message": "User registered successfully.",
    "data": {
        "userId": "64a7f8e2b5d3c2a1f8e9b7c3",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGE3ZjhlMmI1ZDNjMmExZjhlOWI3YzMiLCJpYXQiOjE2ODg4NzYwMDB9.abc123xyz456"
    }
}
```



# Login Endpoint Documentation

## Endpoint
`POST /users/login`

## Description
This endpoint logs in a user by verifying the provided credentials. Upon successful login, it returns an authentication token along with user details. It is defined in the [user.routes.js](Backend/routes/user.routes.js) and handled by [user.controller.js](Backend/controller/user.controller.js).

## Request Data
The endpoint expects a JSON payload with the following properties:
- **email**: String (Required, must be a valid email address)
- **password**: String (Required, minimum 8 characters)

**Example Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

## Example Responses

**Successful Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1N...", 
  "user": {
    "userId": "64a7f8e2b5d3c2a1f8e9b7c3",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Error Response:**
```json
{
  "message": "Invalid email or password"
}
```

# Profile Endpoint Documentation

## Endpoint
`GET /users/profile`

## Description
This authenticated endpoint retrieves the profile information of the currently logged-in user. It requires a valid authentication token.

## Authentication
Requires valid JWT token in:
- Authorization header: `Bearer <token>` or
- Cookie: `token=<token>`

### Example Response
```json
{
  "userId": "64a7f8e2b5d3c2a1f8e9b7c3",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```

# Logout Endpoint Documentation

## Endpoint
`POST /users/logout`

## Description
This endpoint logs out the current user by invalidating their active session. It requires an authenticated request with a valid JWT token.

## Authentication
Requires valid JWT token in:
- Authorization header: `Bearer <token>` or 
- Cookie: `token=<token>`

## Example Request
No request body is required.

## Example Response
```json
{
  "success": true,
  "message": "User logged out successfully."
}
```

