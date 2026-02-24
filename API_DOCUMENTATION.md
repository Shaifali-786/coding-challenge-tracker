# API Documentation

Complete API reference for the 100 Days Coding Challenge Tracker backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned upon successful login or registration.

---

## Authentication Endpoints

### 1. Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

---

### 2. Login User

**POST** `/auth/login`

Authenticate existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 3. Get Current User

**GET** `/auth/me`

Get currently logged in user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Challenge Endpoints

### 1. Get All Challenges

**GET** `/challenges`

Get all challenges for the authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": "507f1f77bcf86cd799439012",
      "title": "100 Days of LeetCode",
      "description": "Solve one LeetCode problem daily",
      "totalDays": 100,
      "startDate": "2024-01-01T00:00:00.000Z",
      "completedDays": 45,
      "currentStreak": 5,
      "longestStreak": 12,
      "isCompleted": false,
      "daysProgress": [...],
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-02-15T00:00:00.000Z"
    }
  ]
}
```

---

### 2. Get Single Challenge

**GET** `/challenges/:id`

Get a specific challenge by ID.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Challenge ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "title": "100 Days of LeetCode",
    "description": "Solve one LeetCode problem daily",
    "totalDays": 100,
    "startDate": "2024-01-01T00:00:00.000Z",
    "completedDays": 45,
    "currentStreak": 5,
    "longestStreak": 12,
    "isCompleted": false,
    "daysProgress": [
      {
        "dayNumber": 1,
        "isCompleted": true,
        "completedAt": "2024-01-01T10:30:00.000Z",
        "notes": "Solved Two Sum problem"
      },
      {
        "dayNumber": 2,
        "isCompleted": true,
        "completedAt": "2024-01-02T09:15:00.000Z",
        "notes": ""
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-02-15T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Challenge not found"
}
```

---

### 3. Create Challenge

**POST** `/challenges`

Create a new challenge.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "100 Days of Python",
  "description": "Master Python programming",
  "totalDays": 100,
  "startDate": "2024-01-01"
}
```

**Fields:**
- `title` (required): Challenge title
- `description` (optional): Challenge description
- `totalDays` (optional): Total days (default: 100, max: 365)
- `startDate` (optional): Start date (default: today)

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "title": "100 Days of Python",
    "description": "Master Python programming",
    "totalDays": 100,
    "startDate": "2024-01-01T00:00:00.000Z",
    "completedDays": 0,
    "currentStreak": 0,
    "longestStreak": 0,
    "isCompleted": false,
    "daysProgress": [
      { "dayNumber": 1, "isCompleted": false, "completedAt": null, "notes": "" },
      { "dayNumber": 2, "isCompleted": false, "completedAt": null, "notes": "" },
      ...
    ],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### 4. Update Challenge

**PUT** `/challenges/:id`

Update challenge title or description.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id` - Challenge ID

**Request Body:**
```json
{
  "title": "100 Days of Advanced Python",
  "description": "Deep dive into Python"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "100 Days of Advanced Python",
    "description": "Deep dive into Python",
    ...
  }
}
```

---

### 5. Delete Challenge

**DELETE** `/challenges/:id`

Delete a challenge permanently.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Challenge ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {}
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Not authorized to delete this challenge"
}
```

---

### 6. Toggle Day Completion

**PUT** `/challenges/:id/day/:dayNumber`

Mark a day as complete or incomplete.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id` - Challenge ID
- `dayNumber` - Day number (1-100)

**Request Body (Optional):**
```json
{
  "notes": "Completed merge sort implementation"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "completedDays": 46,
    "currentStreak": 6,
    "longestStreak": 12,
    "daysProgress": [
      {
        "dayNumber": 46,
        "isCompleted": true,
        "completedAt": "2024-02-15T14:30:00.000Z",
        "notes": "Completed merge sort implementation"
      },
      ...
    ],
    ...
  }
}
```

**Behavior:**
- If day is incomplete → marks as complete with current timestamp
- If day is complete → marks as incomplete (completedAt = null)
- Automatically updates: completedDays, currentStreak, longestStreak
- Automatically sets isCompleted = true when all days are done

---

### 7. Get Challenge Progress

**GET** `/challenges/:id/progress`

Get detailed progress summary for a challenge.

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Challenge ID

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "challengeId": "507f1f77bcf86cd799439011",
    "title": "100 Days of LeetCode",
    "totalDays": 100,
    "completedDays": 45,
    "progressPercentage": 45.0,
    "currentStreak": 5,
    "longestStreak": 12,
    "isCompleted": false,
    "completedAt": null,
    "startDate": "2024-01-01T00:00:00.000Z",
    "daysSinceStart": 45,
    "badge": "🔥 Halfway Hero"
  }
}
```

**Badge System:**
- 100% completed: "🏆 Champion"
- 50%+ completed: "⭐ Halfway Hero"
- 25%+ completed: "🔥 Quarter Master"
- Less than 25%: null

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Usage Examples with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "securepass123"
  }'
```

### Create Challenge
```bash
curl -X POST http://localhost:5000/api/challenges \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "100 Days of JavaScript",
    "description": "Master JavaScript fundamentals",
    "totalDays": 100
  }'
```

### Get All Challenges
```bash
curl -X GET http://localhost:5000/api/challenges \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Toggle Day 5
```bash
curl -X PUT http://localhost:5000/api/challenges/CHALLENGE_ID/day/5 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"notes": "Learned async/await"}'
```

### Get Progress
```bash
curl -X GET http://localhost:5000/api/challenges/CHALLENGE_ID/progress \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Delete Challenge
```bash
curl -X DELETE http://localhost:5000/api/challenges/CHALLENGE_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Notes

- All dates are in ISO 8601 format
- JWT tokens expire after 7 days (configurable in .env)
- Passwords are hashed using bcrypt before storage
- User can only access their own challenges
- Day completion automatically updates streak calculations
- Challenge completion is automatic when all days are marked complete

---

**For more information, see the main README.md file**
