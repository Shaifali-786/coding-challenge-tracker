const express = require('express');
const router = express.Router();
const {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  toggleDayCompletion,
  getChallengeProgress
} = require('../controllers/challengeController');
const { protect } = require('../middleware/auth');

/**
 * Challenge Routes
 * All routes are protected (require authentication)
 */

// @route   GET /api/challenges
// @desc    Get all challenges for logged in user
// @access  Private
router.get('/', protect, getChallenges);

// @route   POST /api/challenges
// @desc    Create new challenge
// @access  Private
router.post('/', protect, createChallenge);

// @route   GET /api/challenges/:id
// @desc    Get single challenge by ID
// @access  Private
router.get('/:id', protect, getChallenge);

// @route   PUT /api/challenges/:id
// @desc    Update challenge
// @access  Private
router.put('/:id', protect, updateChallenge);

// @route   DELETE /api/challenges/:id
// @desc    Delete challenge
// @access  Private
router.delete('/:id', protect, deleteChallenge);

// @route   PUT /api/challenges/:id/day/:dayNumber
// @desc    Toggle day completion status
// @access  Private
router.put('/:id/day/:dayNumber', protect, toggleDayCompletion);

// @route   GET /api/challenges/:id/progress
// @desc    Get challenge progress summary
// @access  Private
router.get('/:id/progress', protect, getChallengeProgress);

module.exports = router;
