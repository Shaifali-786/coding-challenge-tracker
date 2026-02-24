const mongoose = require('mongoose');

/**
 * Day Progress Sub-Schema
 * Tracks completion status for each day in the challenge
 */
const dayProgressSchema = new mongoose.Schema({
  dayNumber: {
    type: Number,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
    default: ''
  }
}, { _id: false });

/**
 * Challenge Schema
 * Main challenge entity with embedded day progress tracking
 */
const challengeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a challenge title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters'],
    default: ''
  },
  totalDays: {
    type: Number,
    required: true,
    default: 100,
    min: [1, 'Total days must be at least 1'],
    max: [365, 'Total days cannot exceed 365']
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  // Embedded array of day progress
  daysProgress: [dayProgressSchema],
  
  // Calculated fields
  completedDays: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
    isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  lastReminderSent: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

/**
 * Initialize daysProgress array when challenge is created
 */
challengeSchema.pre('save', function(next) {
  // Only initialize if daysProgress is empty
  if (this.isNew && this.daysProgress.length === 0) {
    for (let i = 1; i <= this.totalDays; i++) {
      this.daysProgress.push({
        dayNumber: i,
        isCompleted: false,
        completedAt: null,
        notes: ''
      });
    }
  }
  next();
});

/**
 * Method to calculate and update streak information
 */
challengeSchema.methods.calculateStreaks = function() {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Sort days by day number
  const sortedDays = this.daysProgress.sort((a, b) => a.dayNumber - b.dayNumber);
  
  for (let i = 0; i < sortedDays.length; i++) {
    if (sortedDays[i].isCompleted) {
      tempStreak++;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      // If we hit an incomplete day, check if this is the end of current streak
      if (i === sortedDays.length - 1 || !sortedDays[i + 1]?.isCompleted) {
        tempStreak = 0;
      }
    }
  }
  
  // Calculate current streak (from the last completed day backwards)
  for (let i = sortedDays.length - 1; i >= 0; i--) {
    if (sortedDays[i].isCompleted) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  this.currentStreak = currentStreak;
  this.longestStreak = longestStreak;
};

/**
 * Method to update completed days count
 */
challengeSchema.methods.updateCompletedDays = function() {
  this.completedDays = this.daysProgress.filter(day => day.isCompleted).length;
  
  // Check if challenge is completed
  if (this.completedDays === this.totalDays && !this.isCompleted) {
    this.isCompleted = true;
    this.completedAt = new Date();
  } else if (this.completedDays < this.totalDays && this.isCompleted) {
    this.isCompleted = false;
    this.completedAt = null;
  }
};

module.exports = mongoose.model('Challenge', challengeSchema);
