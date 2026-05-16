# 100 Days Coding Challenge Tracker

A full-stack MERN application for tracking coding challenge progress, daily completion, streaks, and milestones. This project is submitted for DevFusion 2.0 Round 2 as the team's strongest deployed project.

## Live Links

- Live Project: https://coding-challenge-tracker-ka8h.vercel.app/login
- GitHub Repository: https://github.com/Shaifali-786/coding-challenge-tracker

## DevFusion Round 2 Submission

- Team Members: Shaif Ali and Ram Krishna Roy
- Team Leader: Ram Krishna Roy
- Submission Round: Round 2 - Previous Project Submission
- Project Type: Full-stack web application

## Project Overview

100 Days Coding Challenge Tracker helps users stay consistent during coding practice challenges. Users can register, log in, create challenges, mark daily progress, track streaks, and view completion statistics through a responsive dashboard.

The goal is to make long-term coding practice measurable, motivating, and easy to maintain.

## Key Features

- User registration and login with JWT authentication
- Create and manage coding challenges
- Mark daily progress as complete or incomplete
- Track total completed days and progress percentage
- Current streak and longest streak calculation
- Achievement badges for challenge milestones
- Protected routes for user-specific data
- Responsive React interface for desktop and mobile
- MongoDB persistence for users and challenge progress

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcryptjs password hashing
- CORS

## Folder Structure

```text
coding-challenge-tracker/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- package.json
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- App.js
|   |   `-- index.js
|   `-- package.json
`-- README.md
```

## Run Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in the backend folder with:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/coding_challenge_tracker
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000` and the backend runs on `http://localhost:5000`.

## API Highlights

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive a token |
| GET | `/api/auth/me` | Get current user details |
| GET | `/api/challenges` | Get user challenges |
| POST | `/api/challenges` | Create a challenge |
| PUT | `/api/challenges/:id/day/:dayNumber` | Toggle daily completion |
| DELETE | `/api/challenges/:id` | Delete a challenge |

## Deployment Notes

- Frontend is deployed on Vercel.
- Backend requires environment variables for MongoDB and JWT configuration.
- MongoDB Atlas is recommended for production deployment.

## Submission Checklist

- Public GitHub repository: Yes
- Live deployed link: Yes
- README documentation: Yes
- Functional project link: Yes
- Original project work: Yes

## Author

Shaif Ali

Submitted for DevFusion 2.0 Round 2 team project listing with Ram Krishna Roy as team leader.
