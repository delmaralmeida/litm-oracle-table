import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="no-underline text-gray-900 font-semibold text-lg"
        >
          Table Atlas
        </Link>

        <div className="flex gap-6">
          <Link
            to="/"
            className="no-underline text-gray-900 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/library"
            className="no-underline text-gray-900 hover:text-blue-600 transition-colors"
          >
            Library
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
