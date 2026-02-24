# Quick Start Guide

Get up and running with the 100 Days Coding Challenge Tracker in 5 minutes!

## ⚡ Prerequisites

- Node.js installed (v14+)
- MongoDB installed and running
- Terminal/Command Prompt

## 🚀 5-Minute Setup

### Step 1: Setup Backend (2 minutes)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start MongoDB (if not already running)
# macOS: brew services start mongodb-community
# Windows: MongoDB should auto-start
# Linux: sudo systemctl start mongod

# Start backend server
npm start
```

✅ You should see: "✅ MongoDB Connected" and "🚀 Server running on port 5000"

### Step 2: Setup Frontend (2 minutes)

Open a **NEW terminal window**:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

✅ Browser should automatically open at http://localhost:3000

### Step 3: Use the App (1 minute)

1. **Register**: Create an account with name, email, and password
2. **Create Challenge**: Click "+ New Challenge" and fill in details
3. **Track Progress**: Click on a challenge → Click day cards to mark complete
4. **Watch Your Streak**: See your progress grow! 🎉

## 🎯 That's It!

You're now tracking your coding journey!

## 📌 Common Issues

**MongoDB not starting?**
```bash
# macOS
brew services list | grep mongodb
brew services restart mongodb-community

# Linux
sudo systemctl status mongod
sudo systemctl start mongod
```

**Port already in use?**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Dependencies not installing?**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

## 🔧 Default Configuration

- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- Database: mongodb://localhost:27017/coding_challenge_tracker

## 📖 Next Steps

- Read [README.md](README.md) for detailed documentation
- Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
- Customize your challenges and start coding!

---

**Happy Coding! 🚀**
