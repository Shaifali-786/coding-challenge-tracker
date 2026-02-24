import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import profileImg3 from './shaif_passport_image.jpeg';


/**
 * Navbar Component
 * Navigation bar with user info, contact section and logout
 */
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">🎯</span>
            <span className="text-xl font-bold">100 Days Tracker</span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-6">

            {/* Contact Button */}
            <button
              onClick={() => setShowContact(!showContact)}
              className="hover:text-primary-200 font-semibold"
            >
              Contact
            </button>

            {/* User Info & Logout */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white text-primary-600 rounded-full flex items-center justify-center font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Dropdown Panel */}
      {showContact && (
        <div className="absolute right-4 top-16 bg-white text-gray-800 rounded-xl shadow-2xl w-80 p-6 z-50">
          
          {/* Profile Section */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={profileImg3}
              alt="Profile"
              className="w-16 h-16 rounded-full border-4 border-primary-600"
            />
            <div>
              <h3 className="text-lg font-bold">Shaif Ali</h3>
              <p className="text-sm text-gray-600">📞 +91-8809573987</p>
            </div>
          </div>

          <hr className="my-3" />

          {/* Important Links */}
          <div className="flex flex-col space-y-2">
            <a
              href="https://github.com/Shaifali-786"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 font-medium"
            >
              🔗 GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/shaif-ali-466a37215/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 font-medium"
            >
              🔗 LinkedIn
            </a>

            <a
              href="https://shaifportfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 font-medium"
            >
              🔗 Portfolio
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;