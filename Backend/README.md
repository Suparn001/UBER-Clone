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

---

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

---

# Profile Endpoint Documentation

## Endpoint
`GET /users/profile`

## Description
This authenticated endpoint retrieves the profile information of the currently logged-in user. It requires a valid authentication token.

## Authentication
Requires valid JWT token via:
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

---

# Logout Endpoint Documentation

## Endpoint
`POST /users/logout`

## Description
This endpoint logs out the current user by invalidating their active session. It requires an authenticated request with a valid JWT token.

## Authentication
Requires valid JWT token via:
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

---

# Captain (Caption) Endpoints Documentation

These endpoints manage the registration and authentication for captains.

## 1. Registration Endpoint

### Endpoint
`POST /captains/register`

### Description
Registers a new captain by accepting personal details, login credentials, and vehicle information. Validates the payload and returns an authentication token along with the registered captain's details. Note that in the payload, the captain’s name is provided as `fullname`.

### Request Data
The endpoint expects a JSON payload with the following structure:

- **fullname** (object):
  - **firstname**: String (Required)
  - **lastname**: String (Required)
- **email**: String (Required, must be a valid email address)
- **password**: String (Required, minimum 6 characters)
- **vehicle** (object):
  - **color**: String (Required)
  - **plate**: String (Required)
  - **capacity**: Number (Required)
  - **vehicleType**: String (Required, one of: `"car"`, `"motorcycle"`, `"auto"`)

**Example Request Body:**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "caption": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error Response (for existing captain):**
```json
{
  "message": "Caption already exists"
}
```

---

## 2. Login Endpoint

### Endpoint
`POST /captains/login`

### Description
This endpoint logs in a captain by verifying the provided credentials. On successful login, it returns an authentication token along with the captain’s details.

### Request Data
The endpoint expects a JSON payload with the following properties:
- **email**: String (Required, must be a valid email address)
- **password**: String (Required, minimum 6 characters)

**Example Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

**Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "caption": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

**Error Response:**
```json
{
  "message": "Invalid email or password"
}
```

---

## 3. Profile Endpoint

### Endpoint
`GET /captains/profile`

### Description
This authenticated endpoint retrieves the profile information of the currently logged-in captain. It requires a valid authentication token.

### Authentication
Requires valid JWT token via:
- Authorization header: `Bearer <token>` or
- Cookie: `token=<token>`

**Example Response:**
```json
{
  "userId": "64a7f8e2b5d3c2a1f8e9b7c3",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## 4. Logout Endpoint

### Endpoint
`GET /captains/logout`

### Description
Logs out the currently logged-in captain by invalidating their active session using the provided JWT token. After logout, the authentication cookie is cleared.

### Authentication
Requires valid JWT token via:
- Authorization header: `Bearer <token>` or 
- Cookie: `token=<token>`

### Example Response
```json
{
  "message": "Logged out successfully"
}
```

