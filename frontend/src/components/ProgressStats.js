/**
 * ProgressStats Component
 * Displays progress statistics and badges
 */
const ProgressStats = ({ challenge }) => {
  const progressPercentage = ((challenge.completedDays / challenge.totalDays) * 100).toFixed(1);

  // Determine badge based on progress
  const getBadge = () => {
    if (challenge.isCompleted) {
      return { emoji: '🏆', name: 'Champion', color: 'from-yellow-400 to-yellow-600' };
    } else if (challenge.completedDays >= 75) {
      return { emoji: '⭐', name: 'Almost There', color: 'from-purple-400 to-purple-600' };
    } else if (challenge.completedDays >= 50) {
      return { emoji: '🔥', name: 'Halfway Hero', color: 'from-orange-400 to-orange-600' };
    } else if (challenge.completedDays >= 25) {
      return { emoji: '💪', name: 'Quarter Master', color: 'from-blue-400 to-blue-600' };
    } else if (challenge.completedDays >= 10) {
      return { emoji: '🌱', name: 'Getting Started', color: 'from-green-400 to-green-600' };
    }
    return null;
  };

  const badge = getBadge();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Overall Progress</h3>
          <span className="text-2xl font-bold text-primary-600">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${progressPercentage}%` }}
          >
            {parseFloat(progressPercentage) > 10 && (
              <span className="text-xs text-white font-semibold">
                {challenge.completedDays}/{challenge.totalDays}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-primary-600 mb-1">
            {challenge.completedDays}
          </div>
          <div className="text-sm text-gray-600">Days Completed</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-1">
            {challenge.currentStreak}
          </div>
          <div className="text-sm text-gray-600">Current Streak</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {challenge.longestStreak}
          </div>
          <div className="text-sm text-gray-600">Longest Streak</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {challenge.totalDays - challenge.completedDays}
          </div>
          <div className="text-sm text-gray-600">Days Left</div>
        </div>
      </div>

      {/* Badge Section */}
      {badge && (
        <div className={`bg-gradient-to-r ${badge.color} rounded-lg p-4 text-white text-center`}>
          <div className="text-4xl mb-2">{badge.emoji}</div>
          <div className="font-bold text-lg">{badge.name}</div>
          {challenge.isCompleted && (
            <div className="text-sm mt-1 opacity-90">
              Completed on {new Date(challenge.completedAt).toLocaleDateString()}
            </div>
          )}
        </div>
      )}

      {/* Motivational Message */}
      {!challenge.isCompleted && (
        <div className="mt-4 text-center text-gray-600 text-sm">
          {challenge.completedDays === 0 
            ? "Start your journey today! Every expert was once a beginner." 
            : challenge.currentStreak > 5
            ? `Amazing! You're on a ${challenge.currentStreak}-day streak! Keep it going! 🔥`
            : "Keep pushing forward! Consistency is key to success! 💪"
          }
        </div>
      )}
    </div>
  );
};

export default ProgressStats;
