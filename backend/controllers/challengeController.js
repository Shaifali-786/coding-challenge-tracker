const Challenge = require('../models/Challenge');

/**
 * @desc    Get all challenges for logged in user
 * @route   GET /api/challenges
 * @access  Private
 */
const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Get single challenge by ID
 * @route   GET /api/challenges/:id
 * @access  Private
 */
const getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Make sure user owns this challenge
    if (challenge.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this challenge'
      });
    }

    res.status(200).json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Create new challenge
 * @route   POST /api/challenges
 * @access  Private
 */
const createChallenge = async (req, res) => {
  try {
    const { title, description, totalDays, startDate } = req.body;

    // Validation
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a title for the challenge'
      });
    }

    // Add user to req.body
    const challengeData = {
      user: req.user._id,
      title,
      description: description || '',
      totalDays: totalDays || 100,
      startDate: startDate || new Date()
    };

    const challenge = await Challenge.create(challengeData);

    res.status(201).json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Update challenge
 * @route   PUT /api/challenges/:id
 * @access  Private
 */
const updateChallenge = async (req, res) => {
  try {
    let challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Make sure user owns this challenge
    if (challenge.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this challenge'
      });
    }

    const { title, description } = req.body;

    challenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Delete challenge
 * @route   DELETE /api/challenges/:id
 * @access  Private
 */
const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Make sure user owns this challenge
    if (challenge.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this challenge'
      });
    }

    await Challenge.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Toggle day completion status
 * @route   PUT /api/challenges/:id/day/:dayNumber
 * @access  Private
 */
const toggleDayCompletion = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Make sure user owns this challenge
    if (challenge.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this challenge'
      });
    }

    const dayNumber = parseInt(req.params.dayNumber);

    // Find the day in daysProgress array
    const dayIndex = challenge.daysProgress.findIndex(
      day => day.dayNumber === dayNumber
    );

    if (dayIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Day not found'
      });
    }

    // Toggle completion status
    const currentStatus = challenge.daysProgress[dayIndex].isCompleted;
    challenge.daysProgress[dayIndex].isCompleted = !currentStatus;
    challenge.daysProgress[dayIndex].completedAt = !currentStatus ? new Date() : null;

    // Update notes if provided
    if (req.body.notes !== undefined) {
      challenge.daysProgress[dayIndex].notes = req.body.notes;
    }

    // Update completed days count and check if challenge is complete
    challenge.updateCompletedDays();

    // Calculate streaks
    challenge.calculateStreaks();

    await challenge.save();

    res.status(200).json({
      success: true,
      data: challenge
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * @desc    Get challenge progress summary
 * @route   GET /api/challenges/:id/progress
 * @access  Private
 */
const getChallengeProgress = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: 'Challenge not found'
      });
    }

    // Make sure user owns this challenge
    if (challenge.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this challenge'
      });
    }

    // Calculate progress percentage
    const progressPercentage = ((challenge.completedDays / challenge.totalDays) * 100).toFixed(1);

    // Calculate days since start
    const daysSinceStart = Math.floor(
      (new Date() - new Date(challenge.startDate)) / (1000 * 60 * 60 * 24)
    );

    const progressSummary = {
      challengeId: challenge._id,
      title: challenge.title,
      totalDays: challenge.totalDays,
      completedDays: challenge.completedDays,
      progressPercentage: parseFloat(progressPercentage),
      currentStreak: challenge.currentStreak,
      longestStreak: challenge.longestStreak,
      isCompleted: challenge.isCompleted,
      completedAt: challenge.completedAt,
      startDate: challenge.startDate,
      daysSinceStart,
      badge: challenge.isCompleted ? '🏆 Champion' : challenge.completedDays >= 50 ? '⭐ Halfway Hero' : challenge.completedDays >= 25 ? '🔥 Quarter Master' : null
    };

    res.status(200).json({
      success: true,
      data: progressSummary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  toggleDayCompletion,
  getChallengeProgress
};
