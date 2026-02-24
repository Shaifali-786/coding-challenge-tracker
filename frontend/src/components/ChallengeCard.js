import { Link } from 'react-router-dom';

/**
 * ChallengeCard Component
 * Displays challenge summary in dashboard
 */
const ChallengeCard = ({ challenge }) => {
  const progressPercentage = ((challenge.completedDays / challenge.totalDays) * 100).toFixed(1);

  return (
    <Link to={`/challenge/${challenge._id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border-2 border-transparent hover:border-primary-500 cursor-pointer">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {challenge.title}
            </h3>
            {challenge.description && (
              <p className="text-gray-600 text-sm line-clamp-2">
                {challenge.description}
              </p>
            )}
          </div>
          {challenge.isCompleted && (
            <span className="text-3xl ml-2">🏆</span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span className="font-semibold">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-primary-600">
              {challenge.completedDays}
            </div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-600">
              {challenge.currentStreak}
            </div>
            <div className="text-xs text-gray-600">Current Streak</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">
              {challenge.longestStreak}
            </div>
            <div className="text-xs text-gray-600">Best Streak</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <span>{challenge.totalDays} Days Challenge</span>
          <span>
            Started {new Date(challenge.startDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ChallengeCard;
