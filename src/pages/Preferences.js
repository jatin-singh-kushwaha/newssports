import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sportsList = [
  "Football",
  "Basketball",
  "Cricket",
  "Tennis",
  "Baseball",
  "Hockey",
  "Rugby",
];

const Preferences = () => {
  const [selectedSports, setSelectedSports] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_KEY = "953d5574b5b3492398349d83ae060fec"; 
  const BASE_URL = "https://newsapi.org/v2/everything";

  const toggleSport = (sport) => {
    setSelectedSports((prev) => {
      if (prev.includes(sport)) {
        // Remove sport if already selected
        return prev.filter((s) => s !== sport);
      } else {
        // Add sport to the selection
        return [...prev, sport];
      }
    });
  };
  
  const fetchNews = async () => {
    if (selectedSports.length === 0) {
      alert("Please select at least one sport to fetch news.");
      return;
    }

    setLoading(true);

    try {
      const query = selectedSports.join(" OR "); // Combine selected sports
      const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`
      );
      const data = await response.json();

      if (data.articles) {
        setNewsArticles(data.articles);
        alert("News articles fetched successfully!");
      } else {
        alert("No news articles found for the selected sports.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("Failed to fetch news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    // Save preferences (e.g., to localStorage or Firebase)
    localStorage.setItem("userPreferences", JSON.stringify(selectedSports));
    alert("Preferences saved successfully!");
    fetchNews(); // Fetch news based on preferences
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customize Your Feed</h1>
      <p className="mb-4">Select your favorite sports:</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {sportsList.map((sport) => (
          <div
            key={sport}
            className={`cursor-pointer border px-4 py-2 rounded-md ${
              selectedSports.includes(sport)
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => toggleSport(sport)}
          >
            {sport}
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Preferences
        </button>
        <button
          onClick={fetchNews}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Fetch News
        </button>
      </div>

      {loading && <p className="mt-4">Loading news articles...</p>}

      {/* Display fetched articles */}
      {newsArticles.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600">{article.source.name}</p>
                <p className="mt-2">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-4 block"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;
