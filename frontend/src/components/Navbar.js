import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

/**
 * Navbar Component
 * Navigation bar with user info and logout
 */
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">🎯</span>
            <span className="text-xl font-bold">100 Days Tracker</span>
          </Link>

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
    </nav>
  );
};

export default Navbar;
