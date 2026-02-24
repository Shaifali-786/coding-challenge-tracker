# 100 Days Coding Challenge Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) web application to track your 100-day coding challenges with beautiful UI, progress tracking, and streak management.

## 🎯 Features

### Core Features
- **User Authentication**: JWT-based secure login/register system
- **Challenge Management**: Create, update, and delete challenges
- **Daily Tracking**: Mark days as complete/incomplete with a single click
- **Visual Calendar**: Beautiful grid view of all challenge days
- **Progress Dashboard**: Real-time progress bars and completion percentage
- **Streak Tracking**: Current streak and longest streak calculation
- **Achievement Badges**: Earn badges at milestones (25%, 50%, 75%, 100%)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Data Persistence**: All data stored in MongoDB and persists after logout

### Additional Features
- Clean and modern UI with Tailwind CSS
- Smooth animations and transitions
- Protected routes requiring authentication
- Real-time progress updates
- Challenge deletion with confirmation modal
- User-specific challenges (data isolation)

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18.2.0) - UI framework with hooks
- **React Router DOM** (v6.21.0) - Client-side routing
- **Axios** (v1.6.2) - HTTP client for API calls
- **Tailwind CSS** (v3.4.0) - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** (v4.18.2) - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.0.3) - MongoDB object modeling
- **JWT** (jsonwebtoken v9.0.2) - Authentication tokens
- **bcryptjs** (v2.4.3) - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js
- **Git** (optional) - For cloning the repository

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd coding-challenge-tracker

# Or simply download and extract the ZIP file
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your configuration
# You can use nano, vim, or any text editor
nano .env
```

**Edit `.env` file with your settings:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/coding_challenge_tracker
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

**Important**: Change `JWT_SECRET` to a random string for security!

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS (using Homebrew)
brew services start mongodb-community

# On Windows
# MongoDB should start automatically as a service
# Or run: net start MongoDB

# On Linux
sudo systemctl start mongod
```

Verify MongoDB is running:
```bash
# Connect to MongoDB shell
mongosh
# or
mongo

# You should see the MongoDB prompt
```

### 4. Start Backend Server

```bash
# Make sure you're in the backend directory
cd backend

# Start the server
npm start

# Or use nodemon for development (auto-restart on changes)
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running in development mode on port 5000
```

### 5. Frontend Setup

Open a **new terminal window** and:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

If it doesn't open automatically, visit: **http://localhost:3000**

## 🎮 Using the Application

### 1. Register a New Account
- Visit `http://localhost:3000`
- Click "Register here"
- Fill in your details (name, email, password)
- Click "Create Account"

### 2. Create Your First Challenge
- After logging in, you'll see the Dashboard
- Click "+ New Challenge"
- Enter challenge details:
  - Title (e.g., "100 Days of LeetCode")
  - Description (optional)
  - Total Days (default: 100)
  - Start Date
- Click "Create Challenge"

### 3. Track Your Progress
- Click on any challenge card to view details
- See your progress bar, stats, and badge
- Click on any day card to mark it complete/incomplete
- Completed days turn green
- Track your current and longest streaks

### 4. Monitor Your Stats
The challenge detail page shows:
- **Progress Percentage**: Visual progress bar
- **Days Completed**: Total completed days
- **Current Streak**: Consecutive completed days
- **Longest Streak**: Your best streak record
- **Days Left**: Remaining days to complete
- **Badges**: Earned at milestones

### 5. Manage Challenges
- View all challenges on Dashboard
- Click any challenge to view details
- Delete challenges with confirmation
- Data persists even after logout

## 📁 Project Structure

```
coding-challenge-tracker/
│
├── backend/                      # Backend API server
│   ├── config/
│   │   └── db.js                # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── challengeController.js # Challenge operations
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── errorHandler.js      # Error handling
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Challenge.js         # Challenge schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── challengeRoutes.js   # Challenge endpoints
│   ├── .env.example             # Environment template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                # Entry point
│
├── frontend/                     # React frontend
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        # Navigation bar
│   │   │   ├── PrivateRoute.js  # Route protection
│   │   │   ├── ChallengeCard.js # Challenge card
│   │   │   ├── DayCard.js       # Day card
│   │   │   └── ProgressStats.js # Stats display
│   │   ├── context/
│   │   │   └── AuthContext.js   # Global auth state
│   │   ├── pages/
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Registration page
│   │   │   ├── Dashboard.js     # Main dashboard
│   │   │   └── ChallengeDetail.js # Challenge view
│   │   ├── services/
│   │   │   └── challengeService.js # API calls
│   │   ├── App.js               # Main app component
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js       # Tailwind configuration
│   └── postcss.config.js        # PostCSS configuration
│
└── README.md                     # This file
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user | Yes |

### Challenge Routes (`/api/challenges`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all challenges | Yes |
| POST | `/` | Create challenge | Yes |
| GET | `/:id` | Get single challenge | Yes |
| PUT | `/:id` | Update challenge | Yes |
| DELETE | `/:id` | Delete challenge | Yes |
| PUT | `/:id/day/:dayNumber` | Toggle day completion | Yes |
| GET | `/:id/progress` | Get progress summary | Yes |

### Example API Calls

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login User:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Create Challenge:**
```bash
curl -X POST http://localhost:5000/api/challenges \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "100 Days of Code",
    "description": "Complete coding challenges daily",
    "totalDays": 100
  }'
```

**Toggle Day Completion:**
```bash
curl -X PUT http://localhost:5000/api/challenges/CHALLENGE_ID/day/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,           // User's full name
  email: String,          // Unique email (used for login)
  password: String,       // Hashed password
  createdAt: Date,        // Registration date
  updatedAt: Date         // Last update date
}
```

### Challenge Model
```javascript
{
  user: ObjectId,         // Reference to User
  title: String,          // Challenge title
  description: String,    // Optional description
  totalDays: Number,      // Total days (default: 100)
  startDate: Date,        // Challenge start date
  
  // Embedded array of day progress
  daysProgress: [{
    dayNumber: Number,    // Day number (1-100)
    isCompleted: Boolean, // Completion status
    completedAt: Date,    // When completed
    notes: String         // Optional notes
  }],
  
  // Calculated fields
  completedDays: Number,  // Total completed
  currentStreak: Number,  // Current streak
  longestStreak: Number,  // Best streak
  isCompleted: Boolean,   // Challenge complete?
  completedAt: Date,      // Completion date
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Backend and frontend route protection
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Server-side validation
- **Error Handling**: Secure error messages
- **Token Expiration**: 7-day token validity

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
# Check MongoDB status
brew services list | grep mongodb  # macOS
sudo systemctl status mongod       # Linux
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process or use a different port
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Install dependencies
```bash
cd backend
npm install
```

### CORS Error in Browser
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution**: 
1. Make sure backend is running
2. Check `CLIENT_URL` in `.env` matches frontend URL
3. Restart backend server after changing `.env`

### JWT Token Expired
```
Error: jwt expired
```
**Solution**: Login again to get a new token

## 📝 Development Tips

### Running in Development Mode

**Backend with auto-reload:**
```bash
cd backend
npm run dev  # Uses nodemon
```

**Frontend with auto-reload:**
```bash
cd frontend
npm start  # React auto-reloads
```

### Testing the API

Use tools like:
- **Postman** - GUI for API testing
- **curl** - Command line HTTP client
- **Thunder Client** - VS Code extension

### Database Management

View your data:
```bash
# Connect to MongoDB shell
mongosh

# Use the database
use coding_challenge_tracker

# View collections
show collections

# View all users
db.users.find().pretty()

# View all challenges
db.challenges.find().pretty()
```

## 🚀 Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=very_long_random_string_for_production
CLIENT_URL=https://yourdomain.com
```

### Build Frontend for Production

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deployment Options

- **Backend**: Heroku, Railway, Render, DigitalOcean
- **Frontend**: Vercel, Netlify, AWS S3
- **Database**: MongoDB Atlas (free tier available)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the Troubleshooting section
2. Review the error messages carefully
3. Ensure all dependencies are installed
4. Verify MongoDB is running

## 🎉 Credits

Built with ❤️ using the MERN stack

---

**Happy Coding! 🚀**

Start your 100-day journey today and build the habit of consistent coding!
