import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or App Name */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:text-indigo-200 transition">
            Sports News
          </Link>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white rounded-full shadow-md overflow-hidden"
        >
          <input
            type="text"
            className="px-4 py-2 w-64 text-gray-800 focus:outline-none"
            placeholder="Search sports or teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-r-full transition"
          >
            Search
          </button>
        </form>

        {/* User Actions */}
        <div className="flex items-center space-x-6">
          <Link
            to="/preferences"
            className="text-lg hover:text-indigo-200 transition"
          >
            Preferences
          </Link>
          <button className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-full text-white transition">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
