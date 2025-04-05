import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Fashion Designer
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/designer" className="text-gray-700 hover:text-indigo-600">
              Design Studio
            </Link>
            <Link to="/collections" className="text-gray-700 hover:text-indigo-600">
              Collections
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-indigo-600">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 