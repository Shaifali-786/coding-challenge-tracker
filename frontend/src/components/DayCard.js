/**
 * DayCard Component
 * Displays individual day with completion status
 */
const DayCard = ({ day, onToggle }) => {
  return (
    <div
      onClick={() => onToggle(day.dayNumber)}
      className={`
        relative rounded-lg p-4 cursor-pointer transition-all duration-200 transform hover:scale-105
        ${day.isCompleted 
          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg' 
          : 'bg-white border-2 border-gray-200 hover:border-primary-400 text-gray-700'
        }
      `}
    >
      {/* Day Number */}
      <div className="text-center">
        <div className={`text-xs font-semibold mb-1 ${day.isCompleted ? 'text-white' : 'text-gray-500'}`}>
          Day
        </div>
        <div className="text-2xl font-bold">
          {day.dayNumber}
        </div>
      </div>

      {/* Completion Checkmark */}
      {day.isCompleted && (
        <div className="absolute top-1 right-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Completion Date */}
      {day.isCompleted && day.completedAt && (
        <div className="text-xs mt-2 opacity-90 text-center">
          {new Date(day.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      )}
    </div>
  );
};

export default DayCard;
