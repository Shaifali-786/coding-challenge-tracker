import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import DayCard from "../components/DayCard";
import ProgressStats from "../components/ProgressStats";
import {
  getChallenge,
  toggleDayCompletion,
  deleteChallenge,
} from "../services/challengeService";

/**
 * ChallengeDetail Page
 * Displays challenge calendar, progress, and statistics
 */
const ChallengeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await getChallenge(id);
        if (response.success) {
          setChallenge(response.data);
        }
      } catch (error) {
        console.error("Error fetching challenge:", error);
        if (error.response?.status === 404 || error.response?.status === 401) {
          navigate("/dashboard");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id, navigate]);

  const handleToggleDay = async (dayNumber) => {
    try {
      const response = await toggleDayCompletion(id, dayNumber);
      if (response.success) {
        setChallenge(response.data);
      }
    } catch (error) {
      console.error("Error toggling day:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteChallenge(id);
      if (response.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error deleting challenge:", error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </>
    );
  }

  if (!challenge) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Challenge Not Found
            </h2>
            <Link
              to="/dashboard"
              className="text-primary-600 hover:text-primary-700"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="mb-6">
            <Link
              to="/dashboard"
              className="text-primary-600 hover:text-primary-700 font-medium mb-4 inline-flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </Link>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between mt-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {challenge.title}
                </h1>
                {challenge.description && (
                  <p className="text-gray-600 mb-2">{challenge.description}</p>
                )}
                <p className="text-sm text-gray-500">
                  Started on{" "}
                  {new Date(challenge.startDate).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="mt-4 md:mt-0 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
              >
                Delete Challenge
              </button>
            </div>
          </div>

          {/* Progress Stats */}
          <ProgressStats challenge={challenge} />

          {/* Calendar Grid */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Daily Progress
            </h2>

            <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-3">
              {challenge.daysProgress.map((day) => (
                <DayCard
                  key={day.dayNumber}
                  day={day}
                  onToggle={handleToggleDay}
                />
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
                  <span className="text-gray-600">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded mr-2"></div>
                  <span className="text-gray-600">Not Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Delete Challenge?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{challenge.title}"? This action
              cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengeDetail;
